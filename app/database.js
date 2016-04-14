/**
 * Created by bliberini on 4/9/16.
 */

var pg = require('pg');
var path = require('path');
var squel = require('squel');
var connectionString = require(path.join(__dirname, 'config')).connectionString;

var pgp = require('pg-promise')();
var db = pgp(connectionString);

/*
* Devuelve todos promises
* */
module.exports = function () {
    var self = this;
    self.client = db;

    self.getUsers = function () {
        return self.client.func("getUsers");
    };

    self.addUser = function (user) {
        var userInsert = mapObjectToArray(user);
        return self.client.func("addUser", userInsert);
    };

    self.getUserById = function (id) {
        return self.client.func("getUser", [id]);
    };

    self.getUserInterests = function (id) {
        return self.client.func("getUserInterests", [id]);
    }

    self.updateUser = function (user) {
        var userUpdate = mapObjectToArray(user);
        return self.client.func("updateUser", userUpdate);
    };

    self.deleteUser = function (id) {
        return self.client.func("deleteUser", [id]);
    };

    self.getInterests = function () {
        return self.client.func("getInterests");
    };

    self.addInterest = function (interest) {
        var interestInsert = mapObjectToArray(interest);
        return self.client.func("addInterest", interestInsert);
    };
    
    function mapObjectToArray(obj) {
        var arr = [];
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    arr.push(obj[key].join('|'));
                }
                else {
                    arr.push(obj[key]);
                }
            }
        }

        return arr;
    }
}