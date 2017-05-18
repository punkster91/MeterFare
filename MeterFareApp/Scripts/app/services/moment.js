(function () {
    'use strict';

    var serviceId = 'moment';
    angular.module('app').factory(serviceId, ['$window', moment]);

    function moment($window) {
        return $window.moment;
    }
})();
