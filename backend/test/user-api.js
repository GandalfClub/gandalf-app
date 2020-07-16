const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const appApiConfig = require('../src/config/env').default.api;
chai.should();

/**
 * API tests
 */
describe('User API', () => {

    it('get all users', (done) => {
        request(app)
            .get(appApiConfig.userUri)
            .set('Cookie', global.adminCookie)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
            })
            .end(done);
    });

    it('create new user', (done) => {
        const newUser = {
            email: 'new.user@gmail.com',
        };

        request(app)
            .post(appApiConfig.userUri)
            .send(newUser)
            .set('Cookie', global.adminCookie)
            .expect((res) => {
                res.status.should.equal(201);
                res.body.should.have.property('email');
            })
            .end(done);
    });

    it('get self user profile', (done) => {
        request(app)
            .get(`${appApiConfig.userUri}/self`)
            .set('Cookie', global.cookie)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.have.property('email');
                global.currentUser = res.body;
            })
            .end(done);
    });
});
