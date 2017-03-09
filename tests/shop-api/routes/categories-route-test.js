/**
 * Created by roman_b on 1/16/2017.
 */
var expect = require('chai').expect;
var request = require('supertest');
var app = require('../../../src/shop-api/app');
var mockery = require('mockery');

beforeEach(function() {
    mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false
    });

    mockery.registerMock('../../db/MongoDBProvider', require('../../mock/MockDBProvider'));
});

afterEach(function() {
    mockery.deregisterAll();
    mockery.disable();
});

describe('GET /shop-api/categories', function() {
    it('should successful return JSON', function(done) {
        request(app)
            .get('/shop-api/categories')
            .set('Accept', 'application/json')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function(res) {
                expect(res.body).to.be.an('Array');
                expect(res.body).to.have.lengthOf(3);
                expect(res.body[0]).to.have.ownProperty('name');
                expect(res.body[0]).to.have.ownProperty('subCategories');
                expect(res.body[2]).to.have.ownProperty('items');
                expect(res.body[0]).to.have.property('name', 'Учебная');
            }).end(function(err, res){
            if (err) return done(err);
            done();
        })

    });
});