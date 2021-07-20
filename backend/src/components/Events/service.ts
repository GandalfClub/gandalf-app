import { IEventsService } from './interface';
import EventsModel, {
    IEventsModel,
    IEventTaskUpdate,
    IEventParticipationModel,
    IGeneralEventInfo,
} from './model';
import * as Joi from 'joi';
import EventValidation from './validation';

const EventsService: IEventsService = {
    async createEvent(eventInfo: { title: string }): Promise<IEventsModel> {
        try {
            const validate: Joi.ValidationResult<{ title: string }> = EventValidation.createEvent(eventInfo);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const event = {
                created: new Date(Date.now()),
                generalInfo: {
                    title: eventInfo.title,
                },
            };

            return await EventsModel.create(event);
        } catch (err) {
            throw new Error(err.message);
        }
    },

    async getAllEvents(): Promise<IEventsModel[]> {
        try {
            return await EventsModel.find({});
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async getEventById(id: string): Promise<IEventsModel> {
        try {
            return await EventsModel.findById(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    async updateTaskInEvent(body: IEventTaskUpdate): Promise<IEventsModel> {
        try {
            const event: IEventsModel = await EventsModel.findById(body.eventId);

            event.tasks = body.tasksId;
            await EventsModel.findByIdAndUpdate(body.eventId, event);

            return event;
        } catch (err) {
            console.error('Error occured due to updating event tasks: ');
            console.error(err.message);
        }
    },

    async updateEvent(body: IGeneralEventInfo, id: string): Promise<IEventsModel> {
        try {
            const validate: Joi.ValidationResult<IGeneralEventInfo> = EventValidation.updateGeneralInfoEvent(body);

            if (validate.error) {
                throw new Error(validate.error.message);
            }

            const event = {
                created: new Date(Date.now()),
                generalInfo: {
                    ...body,
                },
            };

            return EventsModel.findByIdAndUpdate(id, event);
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
            const event: IEventsModel = await EventsModel.findById(eventId);

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
