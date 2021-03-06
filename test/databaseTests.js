/**
 * Created by bliberini on 4/10/16.
 */
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Database = require('./../app/db/database.js');
var base64 = require('node-base64-image');

describe('Database', function () {
    var db = new Database();

    describe('#getUsers', function () {
        it('should return 4 or more users (at least the default ones)', function (done) {
            db.getUsers().then(function (rows) {
                var users = rows;
                expect(users).to.have.length.of.at.least(4);
                done();
            });

        });

        it('should return an array of interests for each user', function (done) {
            db.getUsers().then(function (rows) {
                var users = rows;
                expect(users[0].interests).to.have.length.of.at.least(0);
                done();
            });
        })
    });

    describe('#addUser', function () {
        it('should insert the user successfully', function (done) {
            var img = null;
            base64.base64encoder(__dirname + '/../public/img/imagetest.jpg', { localFile: true, string: true }, function (err, image) {
                if (err) { console.error(err); }
                img = image;
                var user = {
                    name: 'Tom Brady',
                    alias: 'tommyGOAT',
                    photoProfile: img,
                    email: 'tbrady@gmail.com',
                    sex: 'M',
                    edad: 19,
                    locationx: 31.11111,
                    locationy: 32.22222,
                    interests: [{
                        category: "sex",
                        value: "man"
                    },
                    {
                        category: "music/band",
                        value: "pearl jam"
                    },
                    {
                        category: "music/band",
                        value: "radiohead"
                    },
                    {
                        category: "outdoors",
                        value: "running"
                    }]
                };
                db.addUser(user).then(function (data) {
                        expect(data[0]).to.have.property('adduser');
                        done();
                    },
                    function (err) {
                        console.error(err);
                    });

            });
        });
    });

    describe('#getUser', function () {
        it('should return the requested user', function (done) {
            db.getUserById(1).then(function (data) {
                var row = data[0];
                expect(row.name).to.equal('Janeth Doe');
                done();
            });
        });

        it('should return an array of interests for the user', function (done) {
            db.getUserById(1).then(function (data) {
                var row = data[0];
                expect(row.interests).to.have.length.of.at.least(0);
                done();
            });
        });
    });

    describe('#updateUser', function () {
        it('should update the user successfully', function (done) {
            var user = {
                id: 2,
                name: 'Peyton Manning',
                alias: 'peypeyGOAT',
                photoProfile: null,
                email: 'pmanning@gmail.com',
                sex: 'M',
                edad: 18,
                locationx: 31.11111,
                locationy: 32.22222,
                interests: [{
                    category: "sex",
                    value: "man"
                },
                {
                    category: "music/band",
                    value: "pearl jam"
                },
                {
                    category: "music/band",
                    value: "radiohead"
                },
                {
                    category: "outdoors",
                    value: "running"
                }]
            };
            db.updateUser(user).then(function (rply) {
                db.getUserById(2).then(function (data) {
                    var row = data[0];
                    expect(row.name).to.equal('Peyton Manning');
                    done();
                });
            });
        });
    });

    describe('#deleteUser', function () {
        it('should delete the user successfully', function (done) {
            var user = {
                name: 'Tom Brady',
                alias: 'tommyGOAT',
                photoProfile: null,
                email: 'tbrady@gmail.com',
                sex: 'M',
                edad: 29,
                locationx: 31.11111,
                locationy: 32.22222,
                interests: [{
                    category: "sex",
                    value: "man"
                },
                {
                    category: "music/band",
                    value: "pearl jam"
                },
                {
                    category: "music/band",
                    value: "radiohead"
                },
                {
                    category: "outdoors",
                    value: "running"
                }]
            };
            db.addUser(user).then(function (data) {
                expect(data[0]).to.have.property('adduser');
                var id = data[0].adduser;
                db.deleteUser(id).then(function (data) {
                    expect(data[0].deleteuser).to.equal("1");
                    done();
                });
            });
        });
    });

    describe('#getInterests', function () {
        it('should return all interests', function (done) {
            db.getInterests().then(function (data) {
                expect(data).to.have.length.of.at.least(4);
                done();
            });
        });
    });

    describe('#getInterestByNameAndCategory', function () {
        it('should return an interest if it exists', function (done) {
            db.getInterestByNameAndCategory({ name: "Man", category: "Sex" }).then(function (data) {
                expect(data).to.not.be.undefined;
                expect(data).to.have.length.of.at.least(1);
                done();
            });
        });

        it('should return nothing if the interest doesn\'t exist', function (done) {
            db.getInterestByNameAndCategory({ name: "Gingers", category: "Sex" }).then(function (data) {
                expect(data).to.not.be.undefined;
                expect(data.length).to.equal(0);
                done();
            });
        });

        it('should return nothing if the interest exists, but not for that category', function (done) {
            db.getInterestByNameAndCategory({ name: "football", category: "Sex" }).then(function (data) {
                expect(data).to.not.be.undefined;
                expect(data.length).to.equal(0);
                done();
            });
        });
    });


    describe('#addInterest', function () {
        it('should create the interest successfully', function (done) {
            var interest = {
                name: 'fusbal',
                category: 'sport'
            };
            db.addInterest(interest).then(function (data) {
                expect(data[0]).to.have.property('addinterest');
                done();
            });
        });
    });

    describe('#getUserByEmailOrAlias', function () {
        it('should return a row if the email already exists', function (done) {
            var user = { email: 'janedoe@gmail.com' };
            db.getUserByEmailOrAlias(user).then(function (data) {
                expect(data).to.have.length.of.at.least(1);
                done();
            });
        });

        it('should return a row if the alias already exists', function (done) {
            var user = { alias: 'janedoe' };
            db.getUserByEmailOrAlias(user).then(function (data) {
                expect(data).to.have.length.of.at.least(1);
                done();
            });
        });

        it('should return a row if the email and alias already exist', function (done) {
            var user = { email: 'janedoe@gmail.com', alias: 'janedoe' };
            db.getUserByEmailOrAlias(user).then(function (data) {
                expect(data).to.have.length.of.at.least(1);
                done();
            });
        });

        it('should return nothing if neither email nor alias exist yet', function (done) {
            var user = { email: 'asdfasdf@gmail.com', alias: 'jefijefiej' };
            db.getUserByEmailOrAlias(user).then(function (data) {
                expect(data.length).to.equal(0);
                done();
            });
        });
    });

    describe('#updatePhoto', function () {
        it('should return no error on successful completion', function (done) {
            base64.base64encoder(__dirname + '/../public/img/imagetest.jpg', { localFile: true, string: true }, function (err, image) {
                if (err) {
                    console.error(err);
                }
                db.updatePhoto(1, image).then(function (data) {
                    expect(data.length).to.equal(1);
                    done();
                });
            });
        });
    });
});