// SEE reference: https://docs.angularjs.org/guide/unit-testing

// this is what we call a suite
describe('Angular directives', function () {
    // module provided by angular-mocks to load in given module
    beforeEach(module('app'));
    // use to render the directive
    var $compile;
    var $rootScope;

    beforeEach(inject(function (_$controller_, _$compile_, _$rootScope_) {
        // the injector unwraps the underscores from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));




    describe('numbersOnly', function () {
        // store references to controller so that it's available to all tests in this describe block
        var compile, rootScope, form;
        
        beforeEach(function () {
            compile = $compile;
            rootScope = $rootScope;

            // create the html element 
            var element = angular.element(
                '<form name="form">' +
                '<input ng-model="model.minutesTraveled" name="minutesTraveled" overwrite-integer />' +
                '</form>'
                );

            rootScope.model = {
                minutesTraveled: null
            }
            $compile(element)(rootScope);
            form = rootScope.form;
        });

        it ('should be a whole number', function () {
            form.minutesTraveled.$setViewValue('24');
            rootScope.$digest();
            expect(rootScope.model.minutesTraveled).toEqual('24');
        });       
    });
});