import { IPublicEventsService } from './interface';
import EventsModel, { IPublicEventsModel } from './model';
import { Types } from 'mongoose';

const PublicEventsService: IPublicEventsService = {
     /**
     * @returns {Promise <IPublicEventsModel[]>}
     * @memberof UserService
     */
    async getAllEvents(): Promise<IPublicEventsModel[]> {
        try {
            const events: IPublicEventsModel[] = await EventsModel.find({});

            return events.map((event: IPublicEventsModel) => {
                event.progress = this.progressCounter(event.startDate, event.endDate);

                return event;
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
    progressCounter(start: string, end: string): number {
		const hundred: number = 100;

		const dateStart: number = new Date(start).getTime();
		const dateEnd: number = new Date(end).getTime();

		const duration: number = (dateEnd - dateStart);

		const dateNow: number = Date.now();
		const percentOfCompletion: number = (dateNow - dateStart) / duration * hundred;

		if (percentOfCompletion > 0 && percentOfCompletion < hundred) {
			return Math.round(percentOfCompletion);
		}

		return null;
	},

    /**
     * @param {string} id
     * @returns {Promise < IUserModel >}
     * @memberof UserService
     */
    async getEvent(id: string): Promise<IPublicEventsModel> {
        try {
            return await EventsModel.findOne({
                _id: Types.ObjectId(id),
            });
        } catch (error) {
            throw new Error(error.message);
        }
    },
};

export default PublicEventsService;
