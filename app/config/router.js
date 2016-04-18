/**
 * Created by bliberini on 4/14/16.
 */
var express = require('express');
var usersCtrl = require('./../controllers/usersController')();
var interestsCtrl = require('./../controllers/interestsController')();
var photoCtrl = require('./../controllers/photoController')();

module.exports = function (app) {
    'use strict';
    var router =  express.Router();
    
    router.route('/users.html').get(function (req, res) {
        res.sendFile(app.get('views') + '/users.html');
    });

    router.route('/interests.html').get(function (req, res) {
        res.sendFile(app.get('views') + '/interests.html');
    });

    router.route('/register.html').get(function (req, res) {
        res.sendFile(app.get('views') + '/register.html');
    });

    router.route('/').get(function (req, res) {
        res.sendFile(app.get('views') + '/index.html');
    });

    router.route('/users')
        .get(usersCtrl.getUsers)
        .post(usersCtrl.addUser);

    router.route('/users/:id')
        .get(usersCtrl.getUser)
        .put(usersCtrl.updateUser)
        .delete(usersCtrl.deleteUser);

    router.route('/users/:id/photo')
        .put(photoCtrl.updatePhoto);

    router.route("/interests")
        .get(interestsCtrl.getInterests)
        .post(interestsCtrl.addInterest);
    return router;
};
