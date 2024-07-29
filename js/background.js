angular.module('forceCodeBackgroundApp', ["chromeForce"]).controller('MainController', function ($scope, $http, $q, $interval, chromeService) {

    $scope.api = null;

    function init() {
        $scope.api.callRestApi("/query/?q=SELECT Id, Name, PrimaryContact, OrganizationType, IsSandbox FROM Organization LIMIT 1").then(function (response) {
            let org = response.data.records[0];
            chromeService.getSessionId().then(function (result) {
                let sid = result[0];
                let url = 'https://' + result[1] + '.salesforce.com';


                //Get Org Environment
                let edition = "Developer Edition";
                if (org.IsSandbox) {
                    try {
                        edition = `Sandbox - ${url.split('--')[1].split('.')[0]}`;
                    } catch (error) {
                        edition = 'Sandbox';
                    }
                } else if (org.OrganizationType != 'Developer Edition') {
                    edition = `Production - (${org.OrganizationType})`;
                }
                //--------------------------------------------

                let session = { sid, url, edition, id: org.Id, org: org.Name, user: org.PrimaryContact };
                let info = {}
                info[org.Id] = session;
                //Get & Set Storage
                chrome.storage.local.get("SalesforceLWCEditor", function (res) {
                    if (Object.keys(res).length === 0 && res.constructor === Object) {
                        chrome.storage.local.set({ SalesforceLWCEditor: JSON.stringify(info) }, function () { });
                    } else {
                        let organization = JSON.parse(res.SalesforceLWCEditor);
                        organization[org.Id] = session;
                        chrome.storage.local.set({ SalesforceLWCEditor: JSON.stringify(organization) }, function () { });
                    }
                    if (navigator.userAgent.indexOf("Win") != -1) {
                        chrome.windows.create({ url: chrome.extension.getURL('index.html?orgId=' + org.Id), type: "popup", focused: true, state: 'maximized' }, function (res) { });
                    } else {
                        let width = (window.screen && window.screen.width) ? window.screen.width : 1280;
                        let height = (window.screen && window.screen.height) ? window.screen.height : 800;
                        chrome.windows.create({ url: chrome.extension.getURL('index.html?orgId=' + org.Id), type: "popup", focused: true, height, width }, function (res) { });
                    }
                }); //storage
            }, function (err) {
                console.log(err);
            }) //service
        }).catch(error => {
            console.error('Error:', error);
            chrome.tabs.create({ url: `chrome-extension://${chrome.runtime.id}/login.html` });
        });

    }

    chrome.browserAction.onClicked.addListener(function () {
        chromeService.getSessionId().then(function (result) {
            $scope.api = new SalesforceApi(result[0], result[1], $q, $http);
            init();
        }, function (err) {
            console.log(err);
        })
    });

    // Check Domain
    function checkSalesforceDomain() {
        chrome.tabs.onActivated.addListener(function (activeInfo) {
            refreshTab();
        });
        $interval(() => { refreshTab(); }, 1000 * 5);
    }

    function refreshTab() {
        chromeService.getSessionId().then(function (result) {
            $scope.api = new SalesforceApi(result[0], result[1], $q, $http);
            setActive('LWC');
        }, function (err) {
            setInactive();
        })
    }

    function setActive(text) {
        chrome.browserAction.setIcon({
            path: "images/icon64.png"
        });
        setBadge(text, '#0087fd');
    }

    function setInactive() {
        chrome.browserAction.setIcon({
            path: "images/icon64gray.png"
        });
        setBadge("LWC", '#e4dcdc');
    }

    function setBadge(text, color) {
        chrome.browserAction.setBadgeText({ text: text });
        chrome.browserAction.setBadgeBackgroundColor({ color: color })
    }

    checkSalesforceDomain();


})


/* chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({
            url: 'https://sites.google.com/view/salesforce-lwc-editor',
            active: true
        });
    }
    return false;
});

chrome.runtime.setUninstallURL("https://sites.google.com/view/salesforce-lwc-editor/goodbye"); */