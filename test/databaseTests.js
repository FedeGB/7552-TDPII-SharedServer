/**
 * Created by bliberini on 4/10/16.
 */
var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var Database = require('./../app/database.js');

describe('Database', function () {
    var db;

    beforeEach(function () {
        db = new Database();
    });

    it('getUsers() should return 4 or more users (at least the default ones)', function (done) {
        db.getUsers().then(function (rows) {
            var users = rows;
            expect(users).to.have.length.of.at.least(4);
            done();
        });

    });

    it('addUser(:user) should insert the user successfully', function (done) {
        var user = {
            name: 'Tom Brady',
            alias: 'tommyGOAT',
            photoProfile: null,
            email: 'tbrady@gmail.com',
            sex: 'M',
            locationx: 31.11111,
            locationy: 32.22222,
            interests: [1,2,3,4]
        };
        db.addUser(user).then(function (data) {
            expect(data[0]).to.have.property('adduser');
            done();
        });
    });

    it('getUser(:id) should return the requested user', function (done) {
        db.getUserById(1).then(function (data) {
            var row = data[0];
            expect(row.name).to.equal('Janeth Doe');
            done();
        });
    });

    it('updateUser(:user) should update the user successfully', function (done) {
        var user = {
            id: 2,
            name: 'Peyton Manning',
            alias: 'peypeyGOAT',
            photoProfile: null,
            email: 'pmanning@gmail.com',
            sex: 'M',
            locationx: 31.11111,
            locationy: 32.22222,
            interests: [1,2,3,4]
        };
        db.updateUser(user).then(function (rply) {
            db.getUserById(2).then(function (data) {
                var row = data[0];
                expect(row.name).to.equal('Peyton Manning');
                done();
            });
        });
    });

    it('deleteUser(:id) should delete the user successfully', function (done) {
        var user = {
            name: 'Tom Brady',
            alias: 'tommyGOAT',
            photoProfile: null,
            email: 'tbrady@gmail.com',
            sex: 'M',
            locationx: 31.11111,
            locationy: 32.22222,
            interests: [1,2,3,4]
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