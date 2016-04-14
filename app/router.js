/**
 * Created by bliberini on 4/14/16.
 */
var express = require('express');
var usersCtrl = require('./usersController')();
module.exports = function (app) {
    'use strict';
    var router =  express.Router();
    
    router.route('/users.html').get(function (req, res) {
        res.sendFile(app.get('views') + '/users.html');
    });

    router.route('/register.html').get(function (req, res) {
        res.sendFile(app.get('views') + '/register.html');
    });

    router.route('/').get(function (req, res) {
        res.sendFile(app.get('views') + '/index.html');
    });

    router.route('/users')
        .get(usersCtrl.getUsers)
        .post();

    router.route('/users/:id')
        .get()
        .put()
        .delete();

    router.route("/interests")
        .get()
        .post();
    return router;
};
