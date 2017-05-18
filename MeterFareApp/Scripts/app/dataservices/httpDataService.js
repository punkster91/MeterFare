(function () {
    "use strict";

    angular.module("app").factory("httpDataService", ["common", "$http", httpDataService]);

    function httpDataService(common, $http) {

        var $q = common.$q;
        var logger = common.logger;
        var internalMap = {};

        var service = {
            register: register,
            performRequest: performRequest,
            clearAll: clearAll
        };

        return service;

        /////////////////////////////////////////////////////////////////////////////

        function register(endpoints) {
            for (var i = 0; i < endpoints.length; i++) {
                internalMap[endpoints[i].key] = endpoints[i].value;
                // register a promise object
                internalMap[endpoints[i].key].promise = null;
                // register the cached data object
                internalMap[endpoints[i].key].cached = null;
            }
        }

        // executes and returns the promise object for the api end point
        // @param key is the api end point from our apiEndpoints object
        // @param httpParams are the request parameters sent to the server
        function performRequest(key, httpParams) {

            //console.log($http.defaults);
            // Since multiple modules get their data from the same factory module we want to avoid multiple ajax request hence the use of promise
            // Once the promise is resolved the subsequent calls to this module will be resolved with the cache data
            var endpoint = internalMap[key];

            if (httpParams == undefined) {
                httpParams = {
                    params: null,
                    data: null,
                }
            }

            endpoint.promise = $http({
                method: endpoint.$httpParams.method,
                url: endpoint.$httpParams.url,
                //headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },    //jQuery transmit data using this
                headers: endpoint.$httpParams.headers || { 'Content-Type': 'application/json' },                                        // angular uses this
                params: httpParams.params, //map of strings or objects which will be serialized with the paramSerializer and appended as GET parameters,
                data: httpParams.data,   // data to be sent as the request message data,
                responseType: endpoint.$httpParams.responseType || '',
                timeout: common.httpTimeout || 5000
            })
                .then(function (response) {
                    endpoint.cached = response;
                    return $q.resolve(response);
                },
                function (response) {
                    endpoint.cached = response;
                    return $q.reject(response);
                });

            //}
            return endpoint.promise;
        }

        function clearAll() {
            for (var endpoint in internalMap) {
                endpoint.promise = endpoint.cached = null;
            }
        }
    }

    // now we can include this resource service in our main module dependencies
}());