(function() {
    'use strict';

    var app = angular.module('app');

    app.directive('numbersOnly', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                function fromUserInput(text) {
                    if (text) {
                        // strip out all non digit characters
                        var transformedInput = text.replace(/[^0-9]/g, '');
                        // force element to have only digit text
                        if (transformedInput !== text) {
                            ngModelCtrl.$setViewValue(transformedInput);
                            ngModelCtrl.$render();
                        }
                        return transformedInput;
                    }
                    return undefined;
                }
                ngModelCtrl.$parsers.push(fromUserInput);
            }
        }
    });


})();