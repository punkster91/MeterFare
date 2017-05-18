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
                    return 0;
                }
                ngModelCtrl.$parsers.push(fromUserInput);
            }
        }
    });

    app.directive('overwriteInteger', function () {
        return {
            require: '?ngModel',
            link: function (scope, element, attr, ngModelCtrl) {
                // only apply the validator if ngModel is present and AngularJS has added the integer validator
      
                    // this will overwrite the default AngularJS integer validator
                    ngModelCtrl.$validators.integer = function (modelValue, viewValue) {
                        // consider empty models to be valid
                        if (ngModelCtrl.$isEmpty(modelValue)) {
                            ngModelCtrl.$setViewValue(0);
                            // uncomment to display value in the html element
                            ngModelCtrl.$render();
                            return true;
                        }

                        if (/^-?\d+$/.test(viewValue)) {
                            // it is valid integer
                            return true;
                        }

                        return false;
                    }
                
            }
        }
    });


})();