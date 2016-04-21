(function () {
    'use strict';

    app.controller("usersController", function ($scope, dbService) {
        var self = this;

        self.users = [];

        self.load = function () {
            dbService.getUsers().then(function (data) {
                self.users = data.data.users;
            });
        };

        self.load();
    });
})();