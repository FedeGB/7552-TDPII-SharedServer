/**
 * Created by bliberini on 4/20/16.
 */
(function () {
    'use strict';
    app.factory('dbService', ['$http', function ($http) {
        return {
            getUsers: getUsers
        };
        
        function getUsers() {
            return $http({
                method: 'GET',
                url: '/users'
            });
        }
    }]);
})();