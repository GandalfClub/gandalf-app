import { ITaskService } from './interface';
import TaskModel, { ITaskModel, ITaskModelUpdate, ITaskTypeModel, TaskTypeModel } from './model';
import * as Joi from 'joi';
import TaskValidation from './validation';
import HtmlTaskModel from '../HtmlTask/model';

const TaskService: ITaskService = {
    async findAllTasks(): Promise<ITaskModel[]> {
        try {
            return await TaskModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findAllTasksForEvent(idArray: string[]): Promise<ITaskModel[]> {
        try {
            const tasks: ITaskModel[] = await TaskModel.find({
                _id: {
                    $in: idArray
                }
            });

            return await tasks;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async createTask(body: ITaskModel): Promise<ITaskModel> {
        try {
            const validate: Joi.ValidationResult<ITaskModel> = TaskValidation.createTask(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            body.created = new Date(Date.now());

            const task: ITaskModel = await TaskModel.create(body);

            return task;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    async updateTask(body: ITaskModelUpdate): Promise<ITaskModel> {
        try {
            const validate: Joi.ValidationResult<ITaskModelUpdate> = TaskValidation.updateTask(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            body.created = new Date(Date.now());

            const task: ITaskModel = await TaskModel.findById(body._id);
            task.title = body.title;
            task.taskType = body.taskType;
            task.description = body.description;
            task.answers = body.answers;
            task.created = body.created;
            task.codeTemplate = body.codeTemplate;
            task.timeout = body.timeout;
            await TaskModel.findByIdAndUpdate(body._id, task);

            return task;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async createTaskType(body: ITaskTypeModel): Promise<ITaskTypeModel> {
        try {

            const taskType: ITaskTypeModel = await TaskTypeModel.create(body);

            return taskType;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async deleteTaskType(body: any): Promise<void> {
        try {
            await TaskTypeModel.findById(body.id).remove();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async deleteTask(body: any): Promise<void> {
        try {
            await TaskModel.deleteOne({ _id: body.id });
            await HtmlTaskModel.deleteOne({ _id: body.id });
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async findAllTaskTypes(): Promise<ITaskTypeModel[]> {
        try {
            return await TaskTypeModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default TaskService;
