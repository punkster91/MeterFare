(function () {
    'use strict';

    var app = angular.module('app');
    var factoryId = 'datepickerService';
    app.factory(factoryId, ['momentService', datepickerService]);

    // SEE for reference: https://angular-ui.github.io/bootstrap/#!#datepicker
    // A datepicker module using momentjs 
    function datepickerService(momentService) {

        function datepickerService(defaultDate) {
            this.name = "datepickerService";
            // the 
            this.defaultDateFormat = momentService.defaultDateFormat;
            this.altInputFormats = momentService.altDateFormats;
            this.isOpened = false;
            this.defaultDateOptions = {
                formatYear: 'yy',
                maxDate: new Date(2020, 5, 22),
                minDate: new Date(),
                startingDay: 1,
                showWeeks: false
            };
            this.data = defaultDate;
        };

        // opens the datepicker popup
        function openPopup() {
            this.isOpened = true;
        }

        // closes the datepicker popup
        function closePopup() {
            this.isOpened = false;
        }

        // return the selected date
        function getData() {
            return this.data;
        }

        // set the data to the date parameter
        function setData(date) {
            this.data = date;
        }


        // add functions to the service
        datepickerService.prototype.openPopup = openPopup;
        datepickerService.prototype.closePopup = closePopup;
        datepickerService.prototype.getData = getData;
        datepickerService.prototype.setData = setData;

        return {
            // return a new instance of our factory object
            initNewDatePicker: function (defaultDate) {
                return new datepickerService(defaultDate);
            }
        }
    }
})();