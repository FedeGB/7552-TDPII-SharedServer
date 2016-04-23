/**
 * Created by bliberini on 4/20/16.
 */
(function () {
    'use strict';
    app.factory('dbService', ['$http', function ($http) {
        return {
            getUsers: getUsers,
            getInterests: getInterests,
            addUser: addUser,
            addInterest: addInterest
        };
        
        function getUsers() {
            return $http({
                method: 'GET',
                url: '/users'
            });
        }

        function getInterests() {
            return $http({
                method: 'GET',
                url: '/interests'
            })
        }

        function addUser(user) {
            return $http({
                method: 'POST',
                url: '/users',
                data: { user: user }
            });
        }

        function addInterest(interest) {
            return $http({
                method: 'POST',
                url: '/interests',
                data: { interest: interest }
            });
        }
    }]);
})();