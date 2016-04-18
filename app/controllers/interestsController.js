/**
 * Created by bliberini on 4/16/16.
 */
var Database = require('./../db/database');
var db = new Database();
var msgs = require('./../helpers/messages');
var squel = require('squel');

module.exports = function () {
    var self = this;
    
    self.getInterests = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        db.getInterests().then(function (data) {
            var response = {
                interests: data.map(function (int) { return mapInterests(int); }),
                metadata: {
                    version: '0.1',
                    count: data.length                 
                }
            };
            res.send(JSON.stringify(response), null, 3);
        });
    };
    
    self.addInterest = function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        var params = { name: req.body.interest.value, category: req.body.interest.category };
        db.getInterestByNameAndCategory(params).then(function (data) {
            if (data.length === 0) {
                db.addInterest(params).then(function (data) {
                    res.status(201).send({ id: data[0].addinterest });
                },
                function (err) {var message = "";
                    if (err.toString() === msgs.invalidCategoryNamePSQL) {
                        message = msgs.invalidCategoryName;
                    }
                    res.status(500).send({error: message});
                });
            }
            else {
                res.status(500).send({ error: msgs.interestAlreadyExists });
            }
        });
    };
    
    function mapInterests(interest) {
        var mappedInterest = {};
        mappedInterest.category = interest.categoryname;
        mappedInterest.value = interest.interestname;
        return mappedInterest;
    }
    
    return self;
};