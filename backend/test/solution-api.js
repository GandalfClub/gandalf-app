const chai = require('chai');
const request = require('supertest');
const app = require('../src/config/server/server').default;
const appApiConfig = require('../src/config/env').default.api;
chai.should();

/**
 * API tests
 */
describe('Solution API', () => {

    it('post a solution', (done) => {
        let solution = {
            taskId: global.currentTask._id,
            code: `
                solution = (a, b) => a + b;
            `.trim()
        };

        request(app)
            .post(appApiConfig.solutionUri)
            .set('Cookie', global.cookie)
            .send(solution)
            .expect((res) => {
                res.status.should.equal(202);
            })
            .end(done);
    });

    it('get all task solutions', (done) => {
        request(app)
            .get(`${appApiConfig.taskUri}/${global.currentTask._id}/solutions`)
            .set('Cookie', global.adminCookie)
            .expect((res) => {
                res.status.should.equal(200);
                res.body.should.be.an('array');
                global.currentSolution = res.body[0];
                global.currentSolution.taskId.should.equal(global.currentTask._id);
            })
            .end(done);
    });
});
