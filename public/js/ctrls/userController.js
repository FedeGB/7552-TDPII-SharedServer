(function () {
    'use strict';

    app.controller("userController", function ($scope, dbService) {
        var self = this;

        self.categories = [];
        self.interests = [];
        self.user = {
            name: '',
            alias: '',
            email: '',
            sex: 'M',
            photo_profile: null,
            interests: []
        };
        
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
        };

        self.load();

    })
})();