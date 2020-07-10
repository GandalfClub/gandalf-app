import * as Joi from 'joi';
import Validation from '../validation';
import { IHtmlTaskModel, IHtmlTaskModelUpdate } from './model';

class HtmlTaskValidation extends Validation {
    constructor() {
        super();
    }

    createTask(params: IHtmlTaskModel): Joi.ValidationResult<IHtmlTaskModel> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
            taskType: Joi.string().required(),
            description: Joi.string().required(),
            codeTemplate: Joi.string().required()
        });

        return Joi.validate(params, schema);
    }

    updateTask(params: IHtmlTaskModelUpdate): Joi.ValidationResult<IHtmlTaskModelUpdate> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            title: Joi.string().required(),
            taskType: Joi.string().required(),
            description: Joi.string().required(),
            codeTemplate: Joi.string().required(),
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

export default new HtmlTaskValidation();
