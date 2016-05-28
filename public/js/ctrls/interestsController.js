/**
 * Created by bliberini on 4/18/16.
 */
(function () {
    'use strict';
    
    app.controller("interestsController", function ($scope, dbService, $mdToast) {

        $scope.submitted = false;
        $scope.submitButtonText = "Enviar";
        $scope.emptyInterest = function () {
            return {
                category: '',
                value: ''
            };
        };

        var self = this;
        self.interests = [];
        self.categories = [];
        self.categoryInterests = [];
        self.interest = $scope.emptyInterest();
        self.load = function () {
            dbService.getInterests().then(function (data) {
                self.interests = data.data.interests;
                self.categoryInterests = [];
                self.categories = [];
                self.interests.forEach(function (interest) {
                    if (self.categories.indexOf(interest.category) < 0) {
                        self.categories.push(interest.category);
                        self.categoryInterests[interest.category] = [];
                    }
                    self.categoryInterests[interest.category].push(interest);
                });
            });
        };
        $scope.doit = function (cat) {
            self.showInterests = self.interests.find(function (it) { return it.category === cat });
        };
        self.submit = function () {
            $scope.submitted = true;
            $scope.submitButtonText = "Cargando...";
            dbService.addInterest(self.interest).then(function (data) {
                $scope.submitted = false;
                $scope.submitButtonText = "Enviar";
                $mdToast.show(
                    $mdToast.simple('Interés añadido exitosamente')
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
                $scope.submitButtonText = "Enviar";
            });
        };

        self.load();
    });
})();