/**
 * Created by nisarahmad.ajmer@gmail.com.
 */
angular.module('chromeForce', [])
    .service('chromeService', function ($q) {

        function isStandardUi(url) {
            return (url.indexOf('salesforce.com/') >= 0);
        }

        function isLightning(url) {
            return url.indexOf('lightning.force.com/one/one.app') >= 0;
        }
        function isLightningeEvironment(url) {
            return url.indexOf('lightning.force.com/') >= 0;
        }
        function isVisualforce(url) {
            return url.indexOf('visual.force.com') >= 0;
        }

        function isOnSalesforceDomain(url) {
            if (url == null) return false;
            return isLightning(url) || isLightningeEvironment(url) || isStandardUi(url) || isVisualforce(url);
        }

        function isOnSalesforcLightningeEvironment(url) {
            if (url == null) return false;
            return isLightning(url) || isLightningeEvironment(url);
        }

        function getInstanceName(url) {
            if (isStandardUi(url)) {
                return url.split("//")[1].split(/.salesforce/)[0];
            } else if (isLightning(url)) {
                return url.split("//")[1].split(/.lightning/)[0]
            } else if (isLightningeEvironment(url)) {
                return url.split("//")[1].split(/.lightning.force.com/)[0];
            } else if (isVisualforce(url)) {
                return url.split("https://c.")[1].split(".")[0]
            }
        }

        return {

            getIsOnSalesforceDomain: function (url) {
                var deferred = $q.defer();
                this.getCurrentUrl().then(function (url) {
                    deferred.resolve(isOnSalesforceDomain(url));
                });
                return deferred.promise;
            },

            getRecordId: function () {
                var deferred = $q.defer();
                this.getCurrentUrl().then(function (url) {
                    if (isStandardUi(url)) {
                        var values = url.split('/');
                        deferred.resolve(values[values.length - 1]);
                    } else if (isLightning(url)) {
                        var urlLight = url;
                        urlLight = urlLight.split('#/sObject/');
                        deferred.resolve(urlLight[1].split('/')[0]);
                    }
                });
                return deferred.promise;
            },

            getCurrentUrl: function () {
                var deferred = $q.defer();
                this.getCurrentTab().then(function (currentTab) {
                    if (currentTab != null) {
                        deferred.resolve(currentTab.url);
                    } else {
                        deferred.resolve(null);
                    }
                });
                return deferred.promise;
            },

            getSessionId: function () {
                var deferred = $q.defer();
                var that = this;
                try {
                    that.getCurrentTab().then(function (currentTab) {
                        if (currentTab == null) {
                            deferred.reject("1 - It's not a salesforce domain.");
                            return deferred.promise;
                        }
                        var currentUrl = currentTab.url;
                        let skipHost = new Set(['developer.salesforce.com', 'trailhead.salesforce.com', 'success.salesforce.com', 'login.salesforce.com', 'test.salesforce.com']);
                        if (isOnSalesforceDomain(currentUrl) && !skipHost.has(currentUrl)) {
                            try {
                                let isLightning = isOnSalesforcLightningeEvironment(currentUrl);
                                var instanceName = getInstanceName(currentUrl);
                                if (isLightning) {
                                    that.getLightningCookie(instanceName).then(function (cookie) {
                                        deferred.resolve([cookie.value, cookie.instanceName, true]);
                                    }, function (err) {
                                        deferred.resolve(err);
                                    })
                                } else {
                                    that.getCookie(instanceName).then(function (cookie) {
                                        deferred.resolve([cookie.value, instanceName, false]);
                                    }, function (err) {
                                        deferred.resolve(err);
                                    })
                                }
                            } catch (ex) {
                                console.error(ex);
                                deferred.reject(err);
                            }
                        } else {
                            deferred.reject("2 - It's not a salesforce domain.");
                            return deferred.promise;
                        }
                    }, function (err) {
                        deferred.resolve(ex);
                    });
                } catch (ex) {
                    deferred.resolve(ex);
                }
                return deferred.promise;
            },

            getCookie: function (instanceName) {
                var deferred = $q.defer();
                chrome.cookies.get({
                    url: 'https://' + instanceName + '.salesforce.com',
                    name: 'sid'
                }, function (response) {
                    //console.log('getCookie : ', response);
                    deferred.resolve(response)
                });
                return deferred.promise;
            },

            getLightningCookie: function (instanceName) {
                var deferred = $q.defer();
                chrome.cookies.getAll({
                    name: 'sid'
                }, function (response) {
                    let res = {};
                    response.forEach(element => {
                        if (element.domain.includes(instanceName) && element.domain.includes('.salesforce.com')) {
                            res = Object.assign({}, element);
                            res.instanceName = element.domain.replace('.salesforce.com', '');
                        }
                    });
                    deferred.resolve(res);
                });
                return deferred.promise;
            },

            getCurrentTab: function () {
                var deferred = $q.defer();
                chrome.tabs.query({ "currentWindow": true }, function (tabs) {  //Tab tab
                    try {
                        var activeTab = _.find(tabs, function (it) {
                            return it.active;
                        });
                        deferred.resolve(activeTab);
                    } catch (ex) {
                        deferred.reject(ex);
                    }
                });
                return deferred.promise;
            }

        }
    });