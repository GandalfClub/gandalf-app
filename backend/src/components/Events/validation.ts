import * as Joi from 'joi';
import Validation from '../validation';
import { IEventParticipationModel, IGeneralEventInfo } from './model';

class EventValidation extends Validation {
    constructor() {
        super();
    }

    createEvent(params: { title: string }): Joi.ValidationResult<{ title: string }> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
        });

        return Joi.validate(params, schema);
    }

    updateGeneralInfoEvent(params: IGeneralEventInfo): Joi.ValidationResult<IGeneralEventInfo> {
        const schema: Joi.Schema = Joi.object().keys({
            title: Joi.string().required(),
            shortSummary: Joi.string(),
            description: Joi.string().required(),
            startDate: Joi.date().required(),
            endDate: Joi.date().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            isPrivate: Joi.boolean().required(),
            isContinuous: Joi.boolean().required(),
            isDraft: Joi.boolean().required(),
        });

        return Joi.validate(params, schema);
    }

    addNewParticipation(params: IEventParticipationModel): Joi.ValidationResult<IEventParticipationModel> {
        const schema: Joi.Schema = Joi.object().keys({
            userId: Joi.string().required(),
            eventId: Joi.string().required(),
            approved: Joi.boolean().required(),
            roles: Joi.array().items(Joi.string()).required()
        });

        return Joi.validate(params, schema);
    }
}

export default new EventValidation();
