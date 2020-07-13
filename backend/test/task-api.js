const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const appApiConfig = require('../src/config/env').default.api;
chai.should();

/**
 * API tests
 */
describe('Task API', () => {

    it('create new task', (done) => {
        const newTask = {
            title: 'Find a sum',
            description: 'Implement a function which summarizes two numbers',
            answers: [
                {
                    input: [1, 2],
                    output: 3
                },
                {
                    input: [-3, 4],
                    output: 1
                },
                {
                    input: [null, 3],
                    output: 3
                }
            ]
        };

        request(app)
            .post(appApiConfig.taskUri)
            .set('Cookie', global.adminCookie)
            .send(newTask)
            .expect((res) => {
                res.status.should.equal(201);
            })
            .end(done);
    });

    it('get all tasks', (done) => {
        request(app)
            .get(appApiConfig.taskUri)
            .set('Cookie', global.adminCookie)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
                global.currentTask = res.body[0];
            })
            .end(done);
    });
});
