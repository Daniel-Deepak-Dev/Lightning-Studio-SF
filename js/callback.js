$(document).ready(() => {


    function getOrgInfoAndBulidEditor(sid, url) {
        let conn = new jsforce.Connection({
            serverUrl: url,
            instanceUrl: url,
            sessionId: sid,
            version: '54.0',
        });

        conn.query("SELECT Id, Name, PrimaryContact FROM Organization LIMIT 1", function (err, result) {
            if (err) { return alert(err); }
            console.log("result", result);

            if (result.done && result.totalSize > 0) {
                let org = result.records[0];
                let session = { sid, url, id: org.Id, org: org.Name, user: org.PrimaryContact };
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
                    } let width = (window.screen && window.screen.width) ? window.screen.width : 1280;
                    let height = (window.screen && window.screen.height) ? window.screen.height : 800;
                    chrome.windows.create({ url: chrome.extension.getURL('index.html?orgId=' + org.Id), type: "popup", focused: true, height, width }, function (res) {
                        chrome.tabs.getCurrent(function (tab) {
                            chrome.tabs.remove(tab.id, function () { });
                        });
                    });
                }); //storage 
            }
        });
    }

    let urlParams = new URLSearchParams(window.location.search);
    let payload = urlParams.get('payload');
    console.log('payload : ', payload);

    let data = JSON.parse(atob(payload));

    if (data.hasOwnProperty('error')) {
        alert(data.error + ': ' + data.error_description);
    } else {
        getOrgInfoAndBulidEditor(data.access_token, data.instance_url);
    }


    $("body").on("contextmenu", function () {
        return false;
    });

    $(document).keydown(function (event) {
        if ((event.ctrlKey && event.shiftKey && (event.which == 73 || event.key.toLowerCase() == 'i')) || (event.which == 123 || event.key == 'F12')) {
            event.preventDefault();
        }
    });


})