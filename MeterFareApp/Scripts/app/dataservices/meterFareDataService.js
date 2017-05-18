(function () {
    "use strict";

    // This dataservice is using $http
    angular
        .module("app")
        .factory("meterFareDataService", ["common", "httpDataService", meterFareDataService]);

    function meterFareDataService(common, httpDataService) {

        // Naming convention for hash keys are Controller.Action
        var apiHash = {
            calculateFare: "#MeterFare.CalculateFare",
        }
        // create our web api end points
        var apiEndpoints =
            [{
                key: apiHash.calculateFare,
                value: {
                    $httpParams: {
                        method: "POST",
                        url: "api/MeterFare/CalculateFare",
                    }
                }
            }]

        var service = {
            calculateFare: calculateFare
        };

        // auto exec
        init();

        return service;

        /////////////////////////////////////////////////////////////////////////////

        function init() {
            httpDataService.register(apiEndpoints);
        }

        // See API documentation: http://localhost:1122/swagger/ui/index#/MeterFare

        // call the function to calculate total fare
        function calculateFare(httpParams) {
            var key = apiHash.calculateFare;
            return httpDataService.performRequest(key, httpParams);
        }
    }
}());