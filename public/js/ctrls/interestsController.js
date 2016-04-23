/**
 * Created by bliberini on 4/18/16.
 */
(function () {
    'use strict';
    
    app.controller("interestsController", function ($scope, dbService, $mdToast) {

        $scope.submitted = false;
        $scope.submitButtonText = "Submit";
        $scope.emptyInterest = function () {
            return {
                category: '',
                value: ''
            };
        };

        var self = this;
        self.interests = [];
        self.categories = [];
        self.interest = $scope.emptyInterest();
        self.load = function () {
            dbService.getInterests().then(function (data) {
                self.interests = data.data.interests;
                self.interests.forEach(function (interest) {
                    if (self.categories.indexOf(interest.category) < 0) {
                        self.categories.push(interest.category);
                    }
                });
            });
        };
        
        self.submit = function () {
            $scope.submitted = true;
            $scope.submitButtonText = "Loading...";
            dbService.addInterest(self.interest).then(function (data) {
                $scope.submitted = false;
                $scope.submitButtonText = "Submit";
                $mdToast.show(
                    $mdToast.simple('Interest added successfully')
                            .position('top right')
                            .parent(angular.element('#newInterestDiv'))
                            .theme('success-toast')
                );
                self.interest = $scope.emptyInterest();
                $scope.newInterest.$setPristine();
                $scope.newInterest.$setUntouched();
                self.load();
            },
            function (err) {
                $mdToast.show(
                    $mdToast.simple('Error: ' + err.data.error)
                        .position('top right')
                        .parent(angular.element('#newInterestDiv'))
                        .theme('error-toast')
                );
                $scope.submitted = false;
                $scope.submitButtonText = "Submit";
            });
        };

        self.load();
    });
})();