(function () {
    'use strict';

    app.controller("usersController", function ($scope, dbService, $mdToast, $window) {
        
        var self = this;

        self.users = [];

        self.load = function () {
            dbService.getUsers().then(function (data) {
                self.users = data.data.users.map(function (it) { it.deleting = false; it.deleteMessage = "Remove"; return it; });
            });
        };
        
        self.update = function (userId) {
            $window.location.href = '/user.html#?userId=' + userId;
        };

        self.delete = function (user) {
            user.deleting = true;
            user.deleteMessage = "Removing";
            dbService.deleteUser(user.id).then(function (data) {
                self.load();
                $mdToast.show(
                    $mdToast.simple('User removed successfully')
                        .position('top right')
                        .parent(angular.element('#userManagement'))
                        .theme('success-toast')
                );
            },
            function (err) {
                user.deleting = false;
                user.deleteMessage = "Remove";
                $mdToast.show(
                    $mdToast.simple('Error: ' + err.data.error)
                        .position('top right')
                        .parent(angular.element('#userManagement'))
                        .theme('error-toast')
                );
            });
        };

        self.load();
    });
})();