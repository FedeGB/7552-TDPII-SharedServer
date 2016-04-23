/**
 * Created by bliberini on 4/18/16.
 */
(function () {
    'use strict';
    
    app.controller("interestsController", function ($scope, dbService) {
        var self = this;
        self.interests = [];
        self.categories = [];
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

        self.load();
    });
})();