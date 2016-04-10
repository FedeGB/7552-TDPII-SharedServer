/**
 * Created by bliberini on 4/9/16.
 */

var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, 'config')).connectionString;

var query = require('pg-query');
query.connectionParameters = connectionString;

query('Select * from test', function(err, rows, result) {
    console.log(rows);
});

module.exports = function () {
    var self = this;
    self.client = query;

    /*
    * Checkea que exista la tabla Users, sino la crea y añade usuarios por default
    * */
    self.init = function () {
        self.client('Select * from Users', function(err, rows, result) {
            if (err && err.error === 'error: relation "users" does not exist') {
                createUsersTable();
                return;
            }
            if (rows.length === 0) {
                createDefaultUsers();
                return;
            }
        });
    };

    function createUsersTable() {
        var query = 'create table Users ()';
        self.client(query, function (err, rows, result) {
            if (err) {
                console.log(err.toString);
            }
            else {
                createUserRelatedTables();
                createDefaultUsers();
            }
        })
    }

    function createUserRelatedTables() {

    }

    function createDefaultUsers() {

    }
}