(function () {
    'use strict';

    app.controller("usersController", function ($scope) {
        var self = this;

        self.users = [
            {
                id: 1,
                name: "John Doe",
                alias: 'johndoe',
                photo_profile: "http://lorempixel.com/128/128/people/?1",
                location: {
                    latitude: -121.45356,
                    longitude: 46.51119
                },
                interests: [
                    { category: 'music/bands', value: 'radiohead' },
                    { category: 'outdoors', value: 'running' },
                    { category: 'movies', value: 'horror' }
                ]
            },
            {
                id: 2,
                name: "Janeth Doe",
                alias: "janedoe",
                photo_profile: "http://lorempixel.com/128/128/people/?2",
                location: {
                    latitude: -121.45356,
                    longitude: 46.51119
                },
                interests: [
                    { category: 'music/bands', value: 'radiohead' },
                    { category: 'outdoors', value: 'running' },
                    { category: 'movies', value: 'horror' }
                ]
            },
            {
                id: 3,
                name: "Michael Jackson",
                alias: "mijacksn",
                photo_profile: "http://lorempixel.com/128/128/people/?3",
                location: {
                    latitude: -121.45356,
                    longitude: 46.51119
                },
                interests: [
                    { category: 'music/bands', value: 'radiohead' },
                    { category: 'outdoors', value: 'running' },
                    { category: 'movies', value: 'horror' }
                ]
            },
            {
                id: 4,
                name: "Alexis Foobar",
                alias: "afoobar",
                photo_profile: "http://lorempixel.com/128/128/people/?4",
                location: {
                    latitude: -121.45356,
                    longitude: 46.51119
                },
                interests: [
                    { category: 'music/bands', value: 'radiohead' },
                    { category: 'outdoors', value: 'running' },
                    { category: 'movies', value: 'horror' }
                ]
            }
        ];

    });
})();