(function () {
    'use strict';

    var app = angular.module('app');
    var factoryId = 'timepickerService';
    app.factory(factoryId, [timepickerService]);

    // SEE for reference: https://angular-ui.github.io/bootstrap/#!#timepicker
    // A timepicker module using momentjs 
    function timepickerService() {

        function timepickerService(defaultDate) {
            this.name = "timepickerService";
            this.hstep = 1;
            this.mstep = 15;
            this.ismeridian = true;
            this.data = defaultDate;
        };

        // return the JS date object
        function getData() {
            return this.data;
        }

        // set the data to the date parameter
        function setData(date) {
            this.data = date;
        }

        // add functions to the service
        timepickerService.prototype.getData = getData;
        timepickerService.prototype.setData = setData;

        return {
            // use method to return a new instance of our factory
            initNewDatePicker: function (defaultDate) {
                return new timepickerService(defaultDate);
            }
        }
    }
})();