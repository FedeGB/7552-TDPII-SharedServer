/**
 * Created by bliberini on 4/20/16.
 */
(function () {
    'use strict';
    app.factory('dbService', ['$http', function ($http) {
        return {
            getUsers: getUsers,
            getUser: getUser,
            getInterests: getInterests,
            addUser: addUser,
            updateUser: updateUser,
            addInterest: addInterest,
            deleteUser: deleteUser,
            getUserByUsername: getUserByUsername
        };
        
        function getUsers() {
            return $http({
                method: 'GET',
                url: '/users'
            });
        }

        function getUser(userId) {
            return $http({
                method: 'GET',
                url: '/users/' + userId
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

        function updateUser(user) {
            return $http({
                method: 'PUT',
                url: '/users/' + user.id,
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

        function deleteUser(userId) {
            return $http({
                method: 'DELETE',
                url: '/users/' + userId
            });
        }

        function getUserByUsername(username) {
            return $http({
                method: 'GET',
                url: '/users/getByUsername',
                params: { username: username }
            });
        }
    }]);
})();