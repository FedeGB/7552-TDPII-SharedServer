/**
 * Created by bliberini on 4/14/16.
 */
var Database = require('./database');
var db = new Database();

module.exports = function () {
    var self = this;
    self.getUsers = function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        db.getUsers().then(function (data) {

            var response = {
                users: data.map(function (user) { return mapUser(user); }),
                metadata: {
                    version: "0.1",
                    count: data.length
                }
            };
            res.send(JSON.stringify(response), null, 3);
        });      
    };

    self.getUser = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        db.getUserById(req.params.id).then(function (data) {
            var response = {
                user: data.map(function (user) { return mapUser(user); })[0],
                metadata: {
                    version: "0.1"
                }
            };
            res.send(JSON.stringify(response), null, 3);
        });
    };

    function mapUser(user) {
        var mappedUser = {};
        mappedUser.id = user.id;
        mappedUser.name = user.name;
        mappedUser.alias = user.alias;
        mappedUser.photo_profile = user.photoprofile;
        mappedUser.email = user.email;
        mappedUser.sex = user.sex;
        mappedUser.location = {
            latitude: user.locationy,
            longitude: user.locationx
        };
        mappedUser.interests = [];
        for (var i = 0; i < user.interests.length; i++) {
            var interest = user.interests[i];
            mappedUser.interests.push({
                category: interest[0],
                value: interest[1]
            });
        }
        return mappedUser;
    }
    return self;
};