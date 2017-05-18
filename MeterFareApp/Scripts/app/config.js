(function () {
    'use strict';

    // access already created module
    var app = angular.module('app');


    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        version: '1.0',
        events: events
    };

    app.value('config', config);

    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);

    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion


    //#region Configure angular-ui-mask options
    //app.config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
    //    // default
    //    // '9' = any numeric values, /\d/ = acceptable values are 0 to 9
    //    // 'A' = any letters, /[a-zA-Z]/ = all lower and upper case from A to Z is accepted
    //    // '*' = any letter or number
    //    uiMaskConfigProvider.maskDefinitions({ '9': /\d/, 'A': /[a-zA-Z]/, '*': /[a-zA-Z0-9]/ });
    //}]);
    //#endregion


    //#region Configure angular-loading-BarProp
    //app.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    //    // turn the spinner on or off
    //    cfpLoadingBarProvider.includeSpinner = false;

    //    // turn the loading bar on or off
    //    cfpLoadingBarProvider.includeBar = true;

    //    cfpLoadingBarProvider.latencyThreshold = 500;
    //}]);
    //#endregion

    // override ngClick directive to protect against multiple clicks
    //app.config(['$provide', function ($provide) {
    //    $provide.decorator('ngClickDirective', ['$delegate', '$timeout', function ($delegate, $timeout) {
    //        var original = $delegate[0].compile;
    //        var delay = 500;
    //        $delegate[0].compile = function (element, attrs, transclude) {

    //            var disabled = false;
    //            function onClick(evt) {
    //                if (disabled) {
    //                    evt.preventDefault();
    //                    evt.stopImmediatePropagation();
    //                } else {
    //                    disabled = true;
    //                    $timeout(function () { disabled = false; }, delay, false);
    //                }
    //            }
    //            //   scope.$on('$destroy', function () { iElement.off('click', onClick); });
    //            element.on('click', onClick);

    //            return original(element, attrs, transclude);
    //        };
    //        return $delegate;
    //    }]);
    //}]);
})();