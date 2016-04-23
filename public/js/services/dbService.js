/**
 * Created by bliberini on 4/20/16.
 */
(function () {
    'use strict';
    app.factory('dbService', ['$http', function ($http) {
        return {
            getUsers: getUsers,
            getInterests: getInterests,
            addUser: addUser
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
    }]);
})();