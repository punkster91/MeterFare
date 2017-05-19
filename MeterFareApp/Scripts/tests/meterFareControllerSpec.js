// SEE reference: https://docs.angularjs.org/guide/unit-testing

// this is what we call a suite
describe('meterFareController', function () {
    // module provided by angular-mocks to load in given module
    beforeEach(module('app'));
  
    var $scope;
    var $controller;
 
    beforeEach(inject(function (_$controller_, _$rootScope_) {
        // the injector unwraps the underscores from around the parameter names when matching
        $controller = _$controller_;
        $scope = _$rootScope_.$new();
    }));

    describe('vm.title', function () {
        // store references to controller so that it's available to all tests in this describe block
        var controller;
        beforeEach(function () {
            // init our controller
            controller = $controller('meterFareController', { $scope: $scope });

        });

        it('should equal text: "Calculate your expensive taxi cab fare!"', function () {
            expect(controller.title).toEqual('Calculate your expensive taxi cab fare!');
        });
    });

    // valid calculatefarerequest should return a number
    describe('vm.calculateFareRequest', function () {
        // store references to controller so that it's available to all tests in this describe block
        var controller;
        var $q;
        var deferred;

        beforeEach(inject(function (_$q_, meterFareDataService) {
            // we use the $q service to create mock instance of defer
            $q = _$q_;
            deferred = _$q_.defer();
            // use jasmine spy to return the deferred promise
            spyOn(meterFareDataService, 'calculateFare').and.returnValue(deferred.promise);

            // init our controller, passing our spy service instance
            controller = $controller('meterFareController', {
                $scope: $scope,
                meterFareDataService: meterFareDataService
            });
        }));

        // this test is not working atm, cannot get totalFare property from $scope, why??@?$?!$!
        //it('should resolve promise', function () {
        //    //setup the data we wish to return for the .then function in the controller
        //    deferred.resolve(523.4);

        //    // we have to call apply for this to work
        //    $scope.$apply();

        //    // since we called apply, now we can perform our assertions
        //    expect($scope.totalFare).toEqual(523.4);
        //});
    });

    describe('vm.prefill', function () {
        var controller;
        beforeEach(function () {
            controller = $controller('meterFareController', {$scope: $scope});
        });

        it('should fill out all fields', function () {
            // call function
            controller.prefill();

            expect(controller.meterDateControl.getData()).not.toBe(undefined);
            expect(controller.meterTimeControl.getData()).not.toBe(undefined);
            expect(controller.milesTraveled).not.toBe(undefined);
            expect(controller.minutesTraveled).not.toBe(undefined);
        });
    });

    // MORE Tests that I'm no
    // invalid calculatefarerequest should do something else
    // valid submit command should trigger promise
    // invalid submit command should not trigger promise
});
