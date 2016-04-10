/**
 * Created by bliberini on 4/9/16.
 */
var chai = require('chai');
var expect = chai.expect;
var CartSummary = require('./../app/testable.js');

describe('Testable', function () {
    it('getSubTotal() should return 0', function () {
        var car = new CartSummary([{
            id: 1,
            quantity: 4,
            price: 50
        }, {
            id: 2,
            quantity: 2,
            price: 30
        }, {
            id: 3,
            quantity: 1,
            price: 40
        }]);
        expect(car.getSubtotal()).to.equal(300);
    })
})