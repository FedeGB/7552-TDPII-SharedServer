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
            //.when("/contact/:contactId", {
            //    controller: "EditContactController",
            //    templateUrl: "contact.html"
            //})
            .otherwise({
               redirectTo: "/"
            });
});


