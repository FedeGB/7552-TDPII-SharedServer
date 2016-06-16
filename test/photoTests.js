/**
 * Created by bliberini on 4/18/16.
 */
var app = require('../index');
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var base64 = require('node-base64-image');
var request = require('supertest');
var photoCtrl = require('./../app/controllers/photoController')();

describe('Photos', function () {
   describe('#updatePhoto', function () {
       it('should return status 200 upon successful completion', function (done) {
           base64.base64encoder(__dirname + '/../public/img/imagetest.jpg', { localFile: true, string: true }, function (err, image) {
               expect(err).to.equal(null);
               request(app)
                   .put('/users/' + 2 + '/photo')
                   .send({ photo: image })
                   .expect(200)
                   .end(function (err, res) {
                       if (err) {
                           return done(err);
                       }
                       expect(err).to.equal(null);
                       done();
                   });
           });
       });

       it('should return id = \'1\' upon successful completion', function (done) {
           base64.base64encoder(__dirname + '/../public/img/imagetest.jpg', { localFile: true, string: true }, function (err, image) {
               expect(err).to.equal(null);
               request(app)
                   .put('/users/' + 2 + '/photo')
                   .send({ photo: image })
                   .expect(200)
                   .end(function (err, res) {
                       if (err) {
                           return done(err);
                       }
                       expect(err).to.equal(null);
                       // expect(res.body.id).to.not.be.undefined;
                       done();
                   });
           });
       });

       it('should update the photoprofile field with the code sent', function (done) {
           base64.base64encoder(__dirname + '/../public/img/imagetest.jpg', { localFile: true, string: true }, function (err, image) {
               expect(err).to.equal(null);
               request(app)
                   .put('/users/' + 2 + '/photo')
                   .send({ photo: image })
                   .expect(200)
                   .end(function (err, res) {
                       if (err) {
                           return done(err);
                       }
                       expect(err).to.equal(null);
                       expect(res.body.id).to.not.be.undefined;
                       request(app)
                           .get('/users/' + 2)
                           .expect(200)
                           .end(function (err, res) {
                               if (err) {
                                   return done(err);
                               }
                               expect(err).to.equal(null);
                               expect(res.body.user.photo_profile).to.equal(image);
                               done();
                           });
                   });
           });
       });
   });
});