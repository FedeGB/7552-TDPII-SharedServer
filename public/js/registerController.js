(function () {
    'use strict';

    app.controller("registerController", function ($scope) {
        var self = this;
        self.categories = [
            'music/bands',
            'outdoors',
            'movies',
            'sports'
        ];
        self.interests = [
            { category: 'music/bands', value: 'radiohead' },
            { category: 'music/bands', value: 'pearl jam' },
            { category: 'outdoors', value: 'running' },
            { category: 'outdoors', value: 'bouldering' },
            { category: 'movies', value: 'horror' },
            { category: 'movies', value: 'inception' },
            { category: 'sports', value: 'basketball' },
            { category: 'sports', value: 'football' }
        ];
    })
})();