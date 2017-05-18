(function () {
    'use strict';
    var controllerId = 'meterFareController';
    angular.module('app')
        .controller(controllerId, ['common', 'momentService', 'meterFareDataService', 'datepickerService', 'timepickerService', meterFareController]);

    function meterFareController(common, momentService, meterFareDataService, datepickerService, timepickerService) {

        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        
        vm.title = 'Calculate your expensive taxi cab fare!';
        vm.meterDateControl = datepickerService.initNewDatePicker(null);
        vm.meterTimeControl = timepickerService.initNewDatePicker(null);
        vm.milesTraveled = null;
        vm.minutesTraveled = null;

        vm.submitForm = submitForm;
        vm.prefill = prefill;
        vm.resetForm = resetForm;
        
        // auto exec
        activate();

        function activate() {
            var promises = [];
            common.activateController(promises, controllerId)
                .then(function () {
                    console.log(vm.meterDateControl.name);

                    vm.meterDateControl.setData(new Date());
                    vm.meterTimeControl.setData(new Date());
                });
        }

        vm.meterDateFormat = momentService.defaultDateFormat;
        vm.altInputFormats = momentService.altDateFormats;
        vm.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1,
            showWeeks: false,
            initDate : new Date()
        };
        vm.popup1 = {
            opened: false
        };
        vm.open1 = function() {
            vm.popup1.opened = true;
        };

        vm.ismeridian = true;
        vm.hstep = 1;
        vm.mstep = 15;


        function calculateFareRequest(sMeterTime, iMilesTraveled, iMinutesTraveled) {
            // create api parameters from form arguments
            var httpParams = {
                params: {
                    meterTime: sMeterTime,
                    milesTraveled: iMilesTraveled,
                    minutesTraveled: iMinutesTraveled
                }
            };

            return meterFareDataService.calculateFare(httpParams)
                            .then(function (response) {
                                if (response.status == 200) {
                                    vm.totalFare = response.data;
                                } else {
                                    vm.totalFare = null;
                                }
                            });
        }

        // function to submit the form after all validation has occurred
        function submitForm(isValid) {

            vm.submitted = true;

            if (isValid) {
                // get meter date
                var meterDate = vm.meterDateControl.getData();
                var meterTime = vm.meterTimeControl.getData();
                var sMeterTime = momentService.combineDateAndTime(meterDate, meterTime).toISOString()
                calculateFareRequest(sMeterTime, vm.milesTraveled, vm.minutesTraveled);
            } else {
                // somethin something
            }
        }

        function resetForm() {
            vm.meterFareForm.$submitted = false;
        }

        function prefill() {
            var d = new Date();
            vm.meterDateControl.setData(d);
            vm.meterTimeControl.setData(d);
            vm.minutesTraveled = Math.floor(Math.random() * 100);
            vm.milesTraveled = Math.floor(Math.random() * 100);
        }
    }
})();