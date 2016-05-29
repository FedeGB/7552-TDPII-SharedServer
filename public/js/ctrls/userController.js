(function () {
    'use strict';

    app.controller("userController", function ($scope, dbService, $window, $location, $mdToast) {

        $scope.isEdit = false;
        $scope.isNew = true;
        $scope.askedForLocation = false;

        var self = this;
        self.categories = [];
        self.interests = [];
        self.user = {
            name: '',
            alias: '',
            email: '',
            sex: 'M',
            photoprofile: null,
            interests: [],
            location: {}
        };

        $scope.photoprofile = null;
        $scope.submitted = false;
        $scope.submitButtonText = "Enviar";

        self.load = function () {
            if (!$scope.askedForLocation)
            {
                navigator.geolocation.getCurrentPosition(function(position) {
                    self.user.location = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };
                });
                $scope.askedForLocation = true;
            }
            var qs = $location.search();
            if (qs.userId) {
                $scope.isNew = false;
                dbService.getUser(qs.userId).then(function (data) {
                    var currentLocation = self.user.location.latitude !== undefined ? self.user.location : data.data.user.location;
                    self.user = data.data.user;
                    self.user.location = currentLocation;
                    self.user.photoprofile = data.data.user.photo_profile;
                    console.log(self.user);
                    self.fillUserInterests();
                });
            }
            dbService.getInterests().then(function (data) {
                self.interests = data.data.interests;
                self.interests.forEach(function (interest) {
                    if (self.categories.indexOf(interest.category) < 0) {
                        self.categories.push(interest.category);
                    }
                });
                self.fillUserInterests();
            });
        };

        self.fillUserInterests = function () {
            self.interests.forEach(function (interest) {
                if (self.user.interests.length > 0) {
                    var found = self.user.interests.find(function (it) { return it.category === interest.category && it.value === interest.value; });
                    if (found) {
                        interest.selected = true;
                    }
                }
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
                $mdToast.show(
                    $mdToast.simple('Debe elegir al menos un interés')
                        .position('top right')
                        .parent(angular.element('#userForm'))
                        .theme('error-toast')
                );
                valid = false;
            }

            if (self.user.photoprofile === null || self.user.photoprofile === '') {
                $mdToast.show(
                    $mdToast.simple('Debe agregar una foto de perfil')
                        .position('top right')
                        .parent(angular.element('#userForm'))
                        .theme('error-toast')
                );
                valid = false;
            }

            return valid
        };

        self.submit = function () {
            $scope.submitted = true;
            $scope.submitButtonText = "Cargando...";
            if (self.validateSubmit()) {
                if ($scope.isNew) {
                    self.addUser();
                }
                
                else {
                    self.updateUser();
                }
            }
            else {
                $scope.submitted = false;
                $scope.submitButtonText = "Enviar";
            }
        };
        
        self.updateUser = function () {
            dbService.updateUser(self.user).then(function (data) {
                $window.location.href = '/users.html';  //TODO: cambiar por profile del usuario creado
            },
            function (err) {
                console.log(err);
                $mdToast.show(
                    $mdToast.simple('Error al editar usuario: ' +  + err.data.error)
                        .position('top right')
                        .parent(angular.element('#userForm'))
                        .theme('error-toast')
                );
                $scope.submitted = false;
                $scope.submitButtonText = "Enviar";
            });
        };
        
        self.addUser = function () {
            dbService.addUser(self.user).then(function (data) {
                    $window.location.href = '/users.html';  //TODO: cambiar por profile del usuario creado
                },
                function (err) {
                    console.log(err);
                    $mdToast.show(
                        $mdToast.simple('Error al añadir usuario: ' +  + err.data.error)
                            .position('top right')
                            .parent(angular.element('#userForm'))
                            .theme('error-toast')
                    );
                    $scope.submitted = false;
                    $scope.submitButtonText = "Enviar";
                });
        };

        self.load();

    })
})();