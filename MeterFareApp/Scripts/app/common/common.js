(function () {
    'use strict';

    // Define the common module 
    // Contains services:
    //  - common
    //  - logger
    //  - spinner
    var commonModule = angular.module('common', []);

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    commonModule.provider('commonConfig', function () {
        this.config = {
            // These are the properties we need to set
            controllerActivateSuccessEvent: '',
            spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    commonModule.factory('common',
        ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', common]);

    function common($q, $rootScope, $timeout, commonConfig, logger) {
        var throttles = {};
        // standard date format from moment to javascript date object
        var dateFormat = 'MM/DD/YYYY';
        var dateChartFormat = "MMM YYYY";
        // standard date format for the uib datepicker
        var datepickerShortDate = 'MM/dd/yyyy';

        var UIState = {
            Ready: 0,
            Loading: 1,
            Fail: 2,
            Success: 3
        }

        var service = {
            // common angular dependencies
            $broadcast: $broadcast,
            $q: $q,
            $timeout: $timeout,
            logger: logger, // for accessibility
            UIState: UIState,
            dateFormat: dateFormat,
            dateChartFormat: dateChartFormat,
            // generic
            activateController: activateController,
            debouncedThrottle: debouncedThrottle,
            textContains: textContains,
            datepickerShortDate: datepickerShortDate,
            cleanUpSpecialChars: cleanUpSpecialChars
        };

        return service;

        function activateController(promises, controllerId) {
            return $q.all(promises).then(function (eventArgs) {
                var data = { controllerId: controllerId };
                $broadcast(commonConfig.config.controllerActivateSuccessEvent, data);
            });
        }

        function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function debouncedThrottle(key, callback, delay, immediate) {
            // Perform some action (callback) after a delay. 
            // Track the callback by key, so if the same callback 
            // is issued again, restart the delay.

            var defaultDelay = 1000;
            delay = delay || defaultDelay;
            if (throttles[key]) {
                $timeout.cancel(throttles[key]);
                throttles[key] = undefined;
            }
            if (immediate) {
                callback();
            } else {
                throttles[key] = $timeout(callback, delay);
            }
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function cleanUpSpecialChars(str) {
            str = str.replace(/[ÀÁÂÃÄÅ]/g, "A");
            str = str.replace(/[àáâãäå]/g, "a");
            str = str.replace(/[ÈÉÊË]/g, "E");
            str = str.replace(/[é]/g, "e");
            str = str.replace(/[í]/g, "i");
            str = str.replace(/[ó]/g, "o");
            str = str.replace(/[ú]/g, "u");
            str = str.replace(/[ý]/g, "y");
            //.... all the rest
            return str.replace(/[^a-z0-9_]/gi, ''); // final clean up
        };

    }
})();