import { IPublicEventsService } from './interface';
import EventsModel, { IPublicEventsModel } from './model';

const PublicEventsService: IPublicEventsService = {
	async getAllEvents(): Promise<IPublicEventsModel[]> {
		try {
			return await EventsModel.find({});
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

export default PublicEventsService;
