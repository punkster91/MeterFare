(function () {
    'use strict';
    // create angular app
    var app = angular.module('app', [
        // angular modules

        // custom modules
        'common',   // common functions, logger, spinner

        // 3rd party modules
        'ui.bootstrap'
    ]);


    //app.run([], function () {

    //});

    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
    });

})();