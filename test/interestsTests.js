/**
 * Created by bliberini on 4/16/16.
 */
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');
var app = require('../index');
var msgs = require('../app/helpers/messages');

describe('Interests', function () {
    describe('#getInterests', function () {
       it('should return status 200 upon successful completion', function (done) {
           request(app)
               .get('/interests')
               .expect(200)
               .end(function (err, res) {
                   if (err) {
                       return done(err);
                   }
                   expect(err).to.equal(null);
                   done();
               });
       });

       it('should return at least 4 interests (the default ones)', function (done) {
           request(app)
               .get('/interests')
               .expect(200)
               .end(function (err, res) {
                   if (err) {
                       return done(err);
                   }
                   expect(err).to.equal(null);
                   expect(res.body.interests).to.have.length.of.at.least(4);
                   done();
               });
       });

       it('field metadata.count should be equal to the number of records returned', function (done) {
           request(app)
               .get('/interests')
               .expect(200)
               .end(function (err, res) {
                   if (err) {
                       return done(err);
                   }
                   expect(err).to.equal(null);
                   expect(res.body.interests.length).to.equal(res.body.metadata.count);
                   done();
               });
       });

       it('should return the specified fields for each interest', function (done) {
           request(app)
               .get('/interests')
               .expect(200)
               .end(function (err, res) {
                   if (err) {
                       return done(err);
                   }
                   expect(err).to.equal(null);
                   for (var i = 0; i < res.body.interests.length; i++) {
                       var interest = res.body.interests[i];
                       expect(interest.category).to.not.be.undefined;
                       expect(interest.value).to.not.be.undefined;
                   }
                   done();
               });
       });
   });

    describe('#addInterest', function () {
        it('should return an error if the interest already exists', function (done) {
           request(app)
               .post('/interests')
               .send({ interest: { category: 'sex', value: 'man' } })
               .expect(500)
               .end(function (err, res) {
                   if (err) {
                       return done(err);
                   }
                   expect(err).to.equal(null);
                   expect(res.body.error).to.equal(msgs.interestAlreadyExists);
                   done();
               });
        });

        it('should not return error if an interest with the same name already exists, but for a different category', function (done) {
            request(app)
                .post('/interests')
                .send({ interest: { category: 'sport', value: 'man' } })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(undefined);
                    done();
                });
        });

        it('should return an error if the category name doesn\'t exist', function (done) {
            request(app)
                .post('/interests')
                .send({ interest: { category: 'sax', value: 'man' } })
                .expect(500)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    expect(res.body.error).to.equal(msgs.invalidCategoryName);
                    done();
                });
        });

        it('should return 201 in case of correct insertion', function (done) {
            request(app)
                .post('/interests')
                .send({ interest: { category: 'sport', value: 'hockey' } })
                .expect(201)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    expect(err).to.equal(null);
                    done();
                });
        });
    });


});