import * as Joi from 'joi';
import Validation from '../validation';
import { IEventsnModel, IEventsnModelUpdate } from './model';

class EventValidation extends Validation {
    constructor() {
        super();
    }

    createEvent(params: IEventsnModel): Joi.ValidationResult<IEventsnModel> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            isActive: Joi.boolean().required()
        });

        return Joi.validate(params, schema);
    }

    updateEvent(params: IEventsnModelUpdate): Joi.ValidationResult<IEventsnModelUpdate> {
        const schema: Joi.Schema = Joi.object().keys({
            _id: Joi.string().required(),
            title: Joi.string().required(),
            description: Joi.string().required(),
            isActive: Joi.boolean().required()
        });

        return Joi.validate(params, schema);
    }
}

export default new EventValidation();
