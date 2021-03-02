import { IEventsService } from './interface';
import EventsModel, { IEventsnModel, IEventTaskUpdate, IEventsnModelUpdate, IEventParticipationModel } from './model';
import * as Joi from 'joi';
import EventValidation from './validation';

const EventsService: IEventsService = {
    async createEvent(eventInfo: IEventsnModel): Promise<IEventsnModel> {
        try {
            const validate: Joi.ValidationResult<IEventsnModel> = EventValidation.createEvent(eventInfo);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            eventInfo.created = new Date(Date.now());

            const event: IEventsnModel = await EventsModel.create(eventInfo);

            return event;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async getAllEvents(): Promise<IEventsnModel[]> {
        try {
            return await EventsModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateTaskInEvent(body: IEventTaskUpdate): Promise<IEventsnModel> {
        try {
            const event: IEventsnModel = await EventsModel.findById(body.eventId);

            event.tasks = body.tasksId;
            await EventsModel.findByIdAndUpdate(body.eventId, event);

            return event;
        } catch (err) {
            console.error('Error occured due to updating event tasks: ');
            console.error(err.message);
        }
    },

    async updateEvent(body: IEventsnModelUpdate): Promise<IEventsnModel> {
        try {
            const validate: Joi.ValidationResult<IEventsnModelUpdate> = EventValidation.updateEvent(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const event: IEventsnModel = await EventsModel.findById(body._id);
            event.title = body.title;
            event.description = body.description;
            event.isActive = body.isActive;
            event.created = new Date(Date.now());

            await EventsModel.findByIdAndUpdate(body._id, event);

            return event;
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async deleteEvent(body: any): Promise<void> {
        try {
            await EventsModel.findById(body.id).remove();
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async addNewEventParticipation(participation: IEventParticipationModel): Promise<IEventParticipationModel> {
        try {
            const validate: Joi.ValidationResult<IEventParticipationModel> =
                EventValidation.addNewParticipation(participation);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const userId: string = participation.userId;
            const eventId: string = participation.eventId;
            const event: IEventsnModel = await EventsModel.findById(eventId);

            const alreadyExists: IEventParticipationModel = event
                .eventParticipations
                .find((value: IEventParticipationModel) => value.userId === userId);

            if (alreadyExists) {
                throw new Error('Already participated');
            }

            event.eventParticipations.push(participation);
            await event.save();

            return participation;

        } catch (error) {
            throw new Error(error.message);
        }
    }
};


export default EventsService;
