/**
 * Created by bliberini on 4/14/16.
 */
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index');

describe('Users', function () {
    describe('#getUsers', function () {
        it('should return a JSON with all the users', function (done) {
            request(app)
                .get('/users')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('metadata.count must be equal to the number of users returned', function (done) {
            request(app)
                .get('/users')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.metadata.count).to.equal(res.body.users.length);
                    done();
                });
        });

        it('should return the fields specified in the requirement for the reply and each user', function (done) {
            request(app)
                .get('/users')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('users');
                    expect(res.body).to.have.property('metadata');
                    expect(res.body.metadata).to.have.property('count');
                    expect(res.body.metadata).to.have.property('version');
                    for (var i = 0; i < res.body.users.length; i++) {
                        var user = res.body.users[i];
                        expect(user).to.have.property('name');
                        expect(user).to.have.property('alias');
                        expect(user).to.have.property('email');
                        expect(user).to.have.property('sex');
                        expect(user).to.have.property('photo_profile');
                        expect(user).to.have.property('location');
                        expect(user).to.have.property('interests');
                        if (user.location) {
                            expect(user.location).to.have.property('latitude');
                            expect(user.location).to.have.property('longitude');
                        }
                        if (user.interests) {
                            for (var j = 0; j < user.interests; j++) {
                                var interest = user.interests[j];
                                expect(interest).to.have.property('category');
                                expect(interest).to.have.property('value');
                            }
                        }
                    }
                    done();
                });
        });
    });
});
