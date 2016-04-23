(function () {
    'use strict';

    app.controller("userController", function ($scope, dbService, $window) {
        var self = this;

        self.categories = [];
        self.interests = [];
        self.alerts = [];
        self.user = {
            name: '',
            alias: '',
            email: '',
            sex: 'M',
            photoprofile: null,
            interests: []
        };

        $scope.photoprofile = null;
        $scope.submitted = false;
        $scope.submitButtonText = "Submit";

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

        self.changePhoto = function () {
            self.user.photoprofile = $scope.photoprofile.base64;
        };

        self.addInterest = function (interest) {
            if (interest.selected) {
                self.user.interests.push({ category: interest.category, value: interest.value });
            }
            else {
                var index = 0;
                self.user.interests.forEach(function (it, idx) {
                   if (it.category === interest.category && it.value === interest.value) {
                       index = idx;
                   }
                });
                self.user.interests.splice(index, 1);
            }
            console.log(self.user.interests);
        };

        self.closeAlert = function (index) {
            self.alerts.splice(index, 1);
        };

        self.validateSubmit = function () {
            var valid = true;
            if (self.user.interests.length === 0) {
                self.alerts.push({ type: 'danger', msg: 'You must select at least one interest' });
                valid = false;
            }

            if (self.user.photo_profile === null || self.user.photo_profile === '') {
                self.alerts.push({ type: 'danger', msg: 'You must add a profile photo' });
                valid = false;
            }

            return valid
        };

        self.submit = function () {
            $scope.submitted = true;
            $scope.submitButtonText = "Loading...";
            if (self.validateSubmit()) {
                dbService.addUser(self.user).then(function (data) {
                    $window.location.href = '/users.html';  //TODO: cambiar por profile del usuario creado
                },
                function (err) {
                    console.log(err);
                    self.alerts.push({ type: 'danger', msg: 'Error adding user: ' + err.data.error });
                    $scope.submitted = false;
                    $scope.submitButtonText = "Submit";
                });
            }
            else {
                $scope.submitted = false;
                $scope.submitButtonText = "Submit";
            }
        };

        self.load();

    })
})();