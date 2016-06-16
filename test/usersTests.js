/**
 * Created by bliberini on 4/14/16.
 */
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index');
var msgs = require('../app/helpers/messages');

describe('Users', function () {
    describe('#getUsers', function () {
        it('should return a JSON object with all the users', function (done) {
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
                        expect(user).to.have.property('edad');
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
   
    describe('#getUser', function () {
   
        it('should return an error if the provided Id is invalid', function (done) {
            request(app)
                .get('/users/' + 'sjdfidjfid')
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(msgs.invalidId);
                    done();
                });
        });
   
        it('should return status 200 on successful completion', function (done) {
            request(app)
                .get('/users/' + 1)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });
   
        it('should return information of requested user', function (done) {
            request(app)
                .get('/users/' + 1)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.user.name).to.equal('Janeth Doe');
                    done();
                });
        });
   
        it('should return a null object if the user doesn\'t exist', function (done) {
            request(app)
                .get('/users/' + 1000000101010101)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.user).to.be.undefined;
                    done();
                });
        });
   
        it('should return the fields specified in the requirement for the reply and each user', function (done) {
            request(app)
                .get('/users/' + 1)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body).to.have.property('user');
                    expect(res.body).to.have.property('metadata');
                    expect(res.body.metadata).to.have.property('version');
                    expect(res.body.user).to.have.property('name');
                    expect(res.body.user).to.have.property('alias');
                    expect(res.body.user).to.have.property('email');
                    expect(res.body.user).to.have.property('sex');
                    expect(res.body.user).to.have.property('edad');
                    expect(res.body.user).to.have.property('photo_profile');
                    expect(res.body.user).to.have.property('location');
                    expect(res.body.user).to.have.property('interests');
                    if (res.body.user.location) {
                        expect(res.body.user.location).to.have.property('latitude');
                        expect(res.body.user.location).to.have.property('longitude');
                    }
                    if (res.body.user.interests) {
                        for (var j = 0; j < res.body.user.interests; j++) {
                            var interest = res.body.user.interests[j];
                            expect(interest).to.have.property('category');
                            expect(interest).to.have.property('value');
                        }
                    }
                    done();
                });
        });
    });
   
    describe('#addUser', function () {
        it('should return 201 on successful completion', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'tommyGOAT2',
                    photoProfile: null,
                    email: 'tbrady2@gmail.com',
                    sex: 'M',
                    age: 22,
                    location: { latitude: 31.11111, longitude: 32.22222 },
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
                    }]}
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });
   
        it('should save the user fields correctly', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady3',
                    alias: 'tommyGOAT3',
                    photoProfile: null,
                    email: 'tbrady3@gmail.com',
                    sex: 'M',
                    edad: 33,
                    location: { latitude: 31.11111, longitude: 32.22222 },
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
                        }]}
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.id).to.be.not.null;
                    request(app)
                        .get('/users/' + res.body.id)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            expect(res.body.user.name).to.equal('Tom Brady3');
                            expect(res.body.user.interests.length).to.equal(4);
                            done();
                        });
                });
        });
   
        it('should save the user with location (0,0) if no location is provided', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady4',
                    alias: 'tommyGOAT4',
                    photoProfile: null,
                    email: 'tbrady4@gmail.com',
                    sex: 'M',
                    age: 55,
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
                        }]}
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.id).to.be.not.null;
                    request(app)
                        .get('/users/' + res.body.id)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            expect(res.body.user.location.longitude).to.equal(0);
                            expect(res.body.user.location.latitude).to.equal(0);
                            done();
                        });
                });
        });
   
        it('should return an error if an interest/category doesn\'t exist', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady5',
                    alias: 'tommyGOAT5',
                    photoProfile: null,
                    email: 'tbrady5@gmail.com',
                    sex: 'M',
                    age: 33,
                    interests: [{
                        category: "oidfjosijdfoisjdf",
                        value: "dfdfdfdfdf"
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(msgs.invalidCategoryMsg);
                    done();
                });
        });
   
        it('should return an error if the user email already exists', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'tommyGOATSE',
                    photoProfile: null,
                    email: 'janedoe@gmail.com',
                    sex: 'M',
                    edad: 23,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.emailAlreadyExistsMsg);
                    done();
                });
        });
   
        it('should return an error if the user alias already exists', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'janedoe',
                    photoProfile: null,
                    email: 'tbrady222@gmail.com',
                    sex: 'M',
                    age: 52,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.aliasAlreadyExistsMsg);
                    done();
                });
        });
   
        it('should return an error if the user alias and email already exist', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'janedoe',
                    photoProfile: null,
                    email: 'janedoe@gmail.com',
                    sex: 'M',
                    age: 19,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.aliasAndEmailAlreadyExistMsg);
                    done();
                });
        });
    });
   
    describe('#updateUser', function () {
        it('should return an error if the params Id and the body Id don\'t match', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 1,
                    name: 'Tom Brady',
                    alias: 'tommyGOAT5',
                    photoProfile: null,
                    email: 'tbrady5@gmail.com',
                    sex: 'M',
                    age: 18,
                    location: { latitude: 31.11111, longitude: 32.22222 },
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.error.toString()).to.contain(msgs.errorCannotPut);
                    done();
                });
        });
   
        it('should return 201 on successful completion', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady',
                    alias: 'tommyGOAT55',
                    photoProfile: null,
                    email: 'tbrady55@gmail.com',
                    sex: 'M',
                    age: 21,
                    location: { latitude: 31.11111, longitude: 32.22222 },
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
                        }]}
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });
   
        it('should save the user fields correctly', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady6',
                    alias: 'tommyGOAT6',
                    photoProfile: null,
                    email: 'tbrady6@gmail.com',
                    sex: 'M',
                    edad: 22,
                    location: { latitude: 31.11111, longitude: 32.22222 },
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
                        }]}
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.id).to.be.not.null;
                    request(app)
                        .get('/users/' + 2)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            expect(res.body.user.name).to.equal('Tom Brady6');
                            expect(res.body.user.interests.length).to.equal(4);
                            done();
                        });
                });
        });
   
        it('should save the user with location (0,0) if no location is provided', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady7',
                    alias: 'tommyGOAT7',
                    photoProfile: null,
                    email: 'tbrady7@gmail.com',
                    sex: 'M',
                    age: 20,
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
                        }]}
                })
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.id).to.be.not.null;
                    request(app)
                        .get('/users/' + 2)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            expect(res.body.user.location.longitude).to.equal(0);
                            expect(res.body.user.location.latitude).to.equal(0);
                            done();
                        });
                });
        });
   
        it('should return an error if an interest/category doesn\'t exist', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady8',
                    alias: 'tommyGOAT8',
                    photoProfile: null,
                    email: 'tbrady8@gmail.com',
                    sex: 'M',
                    age: 43,
                    interests: [{
                        category: "oidfjosijdfoisjdf",
                        value: "dfdfdfdfdf"
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(msgs.invalidCategoryMsg);
                    done();
                });
        });
   
   
        it('should return an error if the user email already exists', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady',
                    alias: 'tommyGOATSE',
                    photoProfile: null,
                    email: 'janedoe@gmail.com',
                    sex: 'M',
                    age: 34,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.emailAlreadyExistsMsg);
                    done();
                });
        });
   
        it('should return an error if the user alias already exists', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady',
                    alias: 'janedoe',
                    photoProfile: null,
                    email: 'tbrady222@gmail.com',
                    sex: 'M',
                    age: 20,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.aliasAlreadyExistsMsg);
                    done();
                });
        });
   
        it('should return an error if the user alias and email already exist', function (done) {
            request(app)
                .put('/users/' + 2)
                .send({ user:
                {
                    id: 2,
                    name: 'Tom Brady',
                    alias: 'janedoe',
                    photoProfile: null,
                    email: 'janedoe@gmail.com',
                    sex: 'M',
                    age: 19,
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
                        }]}
                })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.error).to.equal(msgs.aliasAndEmailAlreadyExistMsg);
                    done();
                });
        });
    });
   
    describe('#deleteUser', function () {
   
        it('should return an error if the provided Id is invalid', function (done) {
            request(app)
                .delete('/users/' + 'sjdfidjfid')
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(msgs.invalidId);
                    done();
                });
        });
   
        it('should return 200 if the user was deleted successfully', function (done) {
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'fjdjfdjf',
                    photoProfile: null,
                    email: 'fjdjfdjf@gmail.com',
                    sex: 'M',
                    age: 21,
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
                        }]}
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    request(app)
                        .delete('/users/' + res.body.id)
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
   
        it('should delete the user from the database', function (done) {
            var userId = 0;
            request(app)
                .post('/users')
                .send({ user:
                {
                    name: 'Tom Brady',
                    alias: 'fjdjfdjf',
                    photoProfile: null,
                    email: 'fjdjfdjf@gmail.com',
                    sex: 'M',
                    age: 19,
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
                        }]}
                })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    userId = res.body.id;
                    request(app)
                        .delete('/users/' + res.body.id)
                        .expect(200)
                        .end(function (err, res) {
                            if (err) {
                                return done(err);
                            }
                            expect(err).to.equal(null);
                            request(app)
                                .get('/users/' + userId)
                                .expect(200)
                                .end(function (err, res) {
                                    if (err) {
                                        return done(err);
                                    }
                                    expect(err).to.equal(null);
                                    expect(res.body.user).to.be.undefined;
                                    done();
                                })
                        });
                });
        });
    });

    describe('#getUserByUsername', function () {

        it('should return status 200 on successful completion', function (done) {
            request(app)
                .get('/users/getByUsername?username=janedoe')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });

        it('should return information of requested user', function (done) {
            request(app)
                .get('/users/getByUsername?username=janedoe')
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.id).to.not.be.undefined;
                    done();
                });
        });

    });

});
