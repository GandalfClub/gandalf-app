import * as Joi from 'joi';
import Validation from '../validation';
import { ISolutionModel } from './model';

class SolutionValidation extends Validation {
    constructor() {
        super();
    }

    createOrUpdateSolution(params: ISolutionModel): Joi.ValidationResult<ISolutionModel> {
        const schema: Joi.Schema = Joi.object().keys({
            taskId: this.customJoi.objectId().required(),
            code: Joi.string().required().max(2000)
        });

        return Joi.validate(params, schema);
    }

    findAllByTask(
        body: {
            id: string
        }
    ): Joi.ValidationResult < {
        id: string
    } > {
        const schema: Joi.Schema = Joi.object().keys({
            id: this.customJoi.objectId().required()
        });

        return Joi.validate(body, schema);
    }
}

export default new SolutionValidation();
