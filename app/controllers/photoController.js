/**
 * Created by bliberini on 4/18/16.
 */
var Database = require('./../db/database');
var db = new Database();
var msgs = require('./../helpers/messages');
var base64 = require('node-base64-image');

module.exports = function () {
    var self = this;
    
    self.updatePhoto = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        db.updatePhoto(req.params.id, req.body.photo).then(function (data) {
            res.status(200).send({ id: data[0].updatephoto });
        });
    };

    return self;
};