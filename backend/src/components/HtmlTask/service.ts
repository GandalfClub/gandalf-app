import { ITaskService } from './interface';
import HtmlTaskModel, { IHtmlTaskModel, IHtmlTaskModelUpdate } from './model';
import * as Joi from 'joi';
import TaskValidation from './validation';

const HtmlTaskService: ITaskService = {
    async findAllHtmlTasks(): Promise<IHtmlTaskModel[]> {
        try {
            return await HtmlTaskModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async findAllHtmlTasksForEvent(idArray: string[]): Promise<IHtmlTaskModel[]> {
        try {
            const tasks: IHtmlTaskModel[] = await HtmlTaskModel.find({
                _id: {
                    $in: idArray
                }
            });

            return await tasks;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async createHtmlTask(body: IHtmlTaskModel): Promise<IHtmlTaskModel> {
        try {
            const validate: Joi.ValidationResult<IHtmlTaskModel> = TaskValidation.createTask(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            body.created = new Date(Date.now());

            const task: IHtmlTaskModel = await HtmlTaskModel.create(body);

            return task;
        } catch (err) {
            throw new Error(err.message);
        }
    },
    async updateHtmlTask(body: IHtmlTaskModelUpdate): Promise<IHtmlTaskModel> {
        try {
            const validate: Joi.ValidationResult<IHtmlTaskModelUpdate> = TaskValidation.updateTask(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            body.created = new Date(Date.now());

            const task: IHtmlTaskModel = await HtmlTaskModel.findById(body._id);
            task.title = body.title;
            task.taskType = body.taskType;
            task.description = body.description;
            task.created = body.created;
            task.codeTemplate = body.codeTemplate;
            await HtmlTaskModel.findByIdAndUpdate(body._id, task);

            return task;
        } catch (err) {
            throw new Error(err.message);
        }
    },
};

export default HtmlTaskService;
