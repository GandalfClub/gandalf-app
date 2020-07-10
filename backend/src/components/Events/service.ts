import { IEventsService } from './interface';
import EventsModel, { IEventsnModel, IEventTaskUpdate, IEventsnModelUpdate } from './model';
import { Types } from 'mongoose';
import * as Joi from 'joi';
import EventValidation from './validation';
import { deleteEvent } from '.';

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
};


export default EventsService;
