import * as Joi from 'joi';
import Validation from '../validation';
import { ITaskModel, ITaskModelUpdate } from './model';

class TaskValidation extends Validation {
    constructor() {
        super();
    }

    createTask(params: ITaskModel): Joi.ValidationResult<ITaskModel> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
            taskType: Joi.string().required(),
            description: Joi.string().required(),
            codeTemplate: Joi.string().required(),
            answers: Joi.array().items(
                Joi.object().keys({
                    input: Joi.array().required(),
                    output: Joi.required()
                })
            ),
            timeout: Joi.number().required().greater(0)
        });

        return Joi.validate(params, schema);
    }

    updateTask(params: ITaskModelUpdate): Joi.ValidationResult<ITaskModelUpdate> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            title: Joi.string().required(),
            taskType: Joi.string().required(),
            description: Joi.string().required(),
            codeTemplate: Joi.string().required(),
            answers: Joi.array().items(
                Joi.object().keys({
                    input: Joi.array().required(),
                    output: Joi.required()
                })
            ),
            timeout: Joi.number().required().greater(0)
        });

        return Joi.validate(params, schema);
    }

    findAllTaskSolutions(
        body: {
            id: string
        }
    ): Joi.ValidationResult<{
        id: string
    }> {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new TaskValidation();
