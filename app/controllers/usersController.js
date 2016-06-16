/**
 * Created by bliberini on 4/14/16.
 */
var Database = require('./../db/database');
var db = new Database();
var msgs = require('./../helpers/messages');

module.exports = function () {
    var self = this;

    self.getUsers = function (req, res) {
        res.setHeader('Content-Type', 'application/json');

        db.getUsers().then(function (data) {

            var response = {
                users: data.map(function (user) { return mapUserFromGet(user); }),
                metadata: {
                    version: "0.1",
                    count: data.length
                }
            };
            res.send(JSON.stringify(response), null, 3);
        },
        function (err) {
            res.status(500).send(err);
        });
    };

    self.getUser = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        if (isNaN(req.params.id)) {
            res.status(500).send({ error: msgs.invalidId });
        }
        else {
            db.getUserById(req.params.id).then(function (data) {
                var response = {
                    user: data.map(function (user) {
                        return mapUserFromGet(user);
                    })[0],
                    metadata: {
                        version: "0.1"
                    }
                };
                res.send(JSON.stringify(response), null, 3);
            },
            function (err) {
                res.status(500).send(err);
            });
        }
    };

    self.addUser = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var userInsert = mapUserFromPostOrPut(req.body.user);

        handleAddAndUpdate(res, db.addUser, userInsert, false);
    };

    self.updateUser = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var userUpdate = mapUserFromPostOrPut(req.body.user);
        if (userUpdate.id !== req.params.id.toString()) {
            res.status(500).send({ error: msgs.paramsIdAndBodyIdDontMatch });
        }
        else {
            handleAddAndUpdate(res, db.updateUser, userUpdate, true);
        }
    };

    self.deleteUser = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        if (isNaN(req.params.id)) {
            res.status(500).send({ error: msgs.invalidId });    
        }
        else {
            db.deleteUser(req.params.id).then(function (data) {
                if (data[0].deleteuser === "1") {
                    res.status(200).send({ message: "OK" });
                }
                res.status(500).send({ message: "Error" });
            },
            function (err) {
                res.status(500).send(err);
            })
        }
        
    };

    self.getUserByUsername = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        db.getUserByEmailOrAlias({ alias: req.query.username }).then(function (data) {
            if (data.length === 0) {
                res.status(500).send({ error: "Not found" });
            }
            else {
                res.send(JSON.stringify(data[0]), null, 3);
            }
        });
    };

    function handleAddAndUpdate(res, action, user, isUpdate) {
        db.getUserByEmailOrAlias({email: user.email, alias: user.alias, id: user.id}).then(function (data) {
            if (data.length === 0) {
                action(user).then(function (data) {
                    if (isUpdate) {
                        if (data[0].updateuser) {
                            res.status(200).send({id: data[0].updateuser});
                        }
                    }
                    else {
                        if (data[0].adduser) {
                            res.status(201).send({id: data[0].adduser});
                        }
                    }
                },
                function (err) {
                    var message = "";
                    if (err.toString() === msgs.invalidCategoryPSQL) {
                        message = msgs.invalidCategoryMsg;
                    }
                    res.status(500).send({error: message});
                });
            }
            else {
                userAlreadyExistsResponse(data, user, res);
            }
        });
    }

    function userAlreadyExistsResponse(data, user, res) {
        if (data[0].alias === user.alias && data[0].email === user.email) {
            res.status(500).send({ error: msgs.aliasAndEmailAlreadyExistMsg });
        }
        if (data[0].alias === user.alias) {
            res.status(500).send({ error: msgs.aliasAlreadyExistsMsg });
        }
        if (data[0].email === user.email) {
            res.status(500).send({ error: msgs.emailAlreadyExistsMsg });
        }
    }

    function mapUserFromPostOrPut(user) {
        var mappedUser = {};
        if (user.id) {
            mappedUser.id = user.id.toString();
        }
        mappedUser.name = user.name;
        mappedUser.alias = user.alias;
        mappedUser.photo_profile = user.photoprofile;
        mappedUser.email = user.email;
        mappedUser.sex = user.sex;
        mappedUser.edad = user.age;
        if (user.location) {
            mappedUser.locationx = user.location.longitude;
            mappedUser.locationy = user.location.latitude;
        }
        else {
            mappedUser.locationx = 0;
            mappedUser.locationy = 0;
        }
        if (user.interests) {
            mappedUser.interests = user.interests;    
        }
        else {
            mappedUser.interests = [];
        }
        return mappedUser;
    }

    function mapUserFromGet(user) {
        var mappedUser = {};
        mappedUser.id = user.id;
        mappedUser.name = user.name;
        mappedUser.alias = user.alias;
        mappedUser.photo_profile = user.photoprofile;
        mappedUser.email = user.email;
        mappedUser.sex = user.sex;
        mappedUser.age = user.edad;
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