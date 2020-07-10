const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const user = require('./fixtures/user.json');
const adminCreds = require('./fixtures/admin.json');
const appApiConfig = require('../src/config/env').default.api;
chai.should();

/**
 * storing globals to access them in API requests
 */
global.cookie = '';
/**
 * Authentication tests
 */
describe('Auth API', () => {

    it('sign up', (done) => {
        request(app)
            .post(`${appApiConfig.authUri}/signup`)
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.cookie = res.header['set-cookie'];
            })
            .end(done)
    });

    it('sign up admin', (done) => {
        request(app)
            .post(`${appApiConfig.authUri}/signup/admin`)
            .send(adminCreds)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.adminCookie = res.header['set-cookie'];
            })
            .end(done);
    });

    it('sign up user with existing email', (done) => {
        request(app)
            .post(`${appApiConfig.authUri}/signup`)
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(400);
            })
            .end(done);
    });

    it('signin to app', (done) => {
        request(app)
            .post(`${appApiConfig.authUri}/signin`)
            .send(user)
            .expect('Content-type', /json/)
            .expect((res) => {
                res.body.status.should.equal(200);
                res.body.logged.should.equal(true);
                res.body.message.should.be.a('string');
                global.cookie = res.header['set-cookie'];
            })
            .end(done);
    });
});
