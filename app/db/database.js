/**
 * Created by bliberini on 4/9/16.
 */

var pg = require('pg');
var path = require('path');
var squel = require('squel');
var connectionString = require('./../config/config').connectionString;

var pgp = require('pg-promise')();
var db = pgp(connectionString);

/*
* Devuelve todos promises
* */
module.exports = function () {
    var self = this;
    self.client = db;

    self.refresh = function () {
        self.init();
    };

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
    
    self.getUserByEmailOrAlias = function (user) {
        var query = squel.select()
            .field('id')
            .field('alias')
            .field('email')
            .from('users')
            .where("(alias = '" + user.alias + "' OR email = '" + user.email + "') AND id <> " + (user.id ? user.id : 0))
            .toString();
        
        return self.client.query(query);
    };

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

    self.getInterestByNameAndCategory = function (interest) {
        var query = squel.select()
            .from('interests')
            .join('categories', null, 'categories.id = interests.categoryid')
            .where("lower(interests.name) = '" + interest.name.toLowerCase() + "' AND lower(categories.name) = '" + interest.category.toLowerCase() + "'")
            .toString();

        return self.client.query(query);
    };

    self.addInterest = function (interest) {
        var interestInsert = mapObjectToArray(interest);
        return self.client.func("addInterest", interestInsert);
    };

    self.updatePhoto = function (userId, photo) {
        var photoUpdate = mapObjectToArray({ id: userId, photo: photo });
        return self.client.func("updatePhoto", photoUpdate);
    };

    function mapObjectToArray(obj) {
        var arr = [];
        for(var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (Array.isArray(obj[key])) {
                    var stringifiedArray = [];
                    for (var i = 0; i < obj[key].length; i++) {
                        var jsonObj = obj[key][i];
                        stringifiedArray.push(JSON.stringify(jsonObj));
                    }
                    arr.push(stringifiedArray);
                }
                else {
                    arr.push(obj[key]);
                }
            }
        }

        return arr;
    }
};