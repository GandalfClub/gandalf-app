require('./auth-api');
require('./user-api');
require('./task-api');
require('./solution-api');

const UserModel = require('../src/components/User/model').default;
const TaskModel = require('../src/components/Task/model').default;
const SolutionModel = require('../src/components/Solution/model').default;

async function dropAll() {
    try {
        await UserModel.collection.drop();
        await TaskModel.collection.drop();
        await SolutionModel.collection.drop();
    } catch (error) {
        console.log('Something went wrong after tests, seems your database doesnt cleaned');
    }
}

dropAll();
