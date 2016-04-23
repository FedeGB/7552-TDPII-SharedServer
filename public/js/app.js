var app = angular.module("matchApp", ['ngRoute', 'ngMaterial', 'ui.bootstrap', 'naif.base64']);
app.config(function($routeProvider) {
	 $routeProvider
            .when("/", {
                templateUrl: "landing.html",
                controller: "IndexController"
            })
            .when("/user.html", {
                controller: "userController",
                templateUrl: "user.html"
            })
            .when("/users.html", {
               controller: "usersController",
               templateUrl: "users.html"
            })
            .otherwise({
               redirectTo: "/"
            });
});

app.controller('loginController', function ($scope, $window, dbService, $mdToast) {
    $scope.submitted = false;

    var self = this;
    self.username = '';

    self.search = function () {
        $scope.submitted = true;
        dbService.getUserByUsername(self.username).then(function (data) {
            $scope.submitted = false;
            if (data.data.id) {
                $window.location.href = '/user.html#?userId=' + data.data.id;                
            }
            else {
                $mdToast.show(
                    $mdToast.simple("User not found")
                        .position('top right')
                        .parent(angular.element('#bs-example-navbar-collapse-1'))
                        .theme('error-toast')
                );
            }
        },
        function (err) {
            $scope.submitted = false;
            self.username = '';
            $mdToast.show(
                $mdToast.simple("User not found")
                    .position('top right')
                    .parent(angular.element('#bs-example-navbar-collapse-1'))
                    .theme('error-toast')
            );
        });
    }
});


