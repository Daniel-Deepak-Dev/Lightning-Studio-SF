/**
 * Created by nisarahmad.ajmer@gmail.com
 */
var SalesforceApi = (function () {

    var _sessionId, _instanceName, _$q, _$http;

    function ChromeForce(sessionId, instanceName, $q, $http) {
        _sessionId = sessionId;
        _instanceName = instanceName;
        _$q = $q;
        _$http = $http;
    }

    ChromeForce.prototype.callRestApi = function (url, method = 'GET', body = '') {
        var deferred = _$q.defer();

        if (method == 'POST') {
            _$http({
                method: 'POST',
                url: "https://" + _instanceName + ".salesforce.com/services/data/v57.0" + url,
                headers: {
                    "Authorization": "Bearer " + _sessionId
                },
                data: body
            }).then(function successCallback(response) {
                return deferred.resolve(response);
            }, function errorCallback(response) {
                return deferred.reject(response);
            });
        } else {
            _$http({
                method: 'GET',
                url: "https://" + _instanceName + ".salesforce.com/services/data/v57.0" + url,
                headers: {
                    "Authorization": "Bearer " + _sessionId
                }
            }).then(function successCallback(response) {
                return deferred.resolve(response);
            }, function errorCallback(response) {
                return deferred.reject(response);
            });
        }

        return deferred.promise;
    };

    return ChromeForce;

})();