var app = angular.module("matchApp", ['ngRoute', 'ui.bootstrap']);
app.config(function($routeProvider) {
	 $routeProvider
            .when("/", {
                templateUrl: "landing.html",
                controller: "IndexController"
            })
            .when("/register", {
               controller: "registerController",
               templateUrl: "register.html"
            })
            .when("/users", {
               controller: "usersController",
               templateUrl: "users.html"
            })
            .otherwise({
               redirectTo: "/"
            });
});

