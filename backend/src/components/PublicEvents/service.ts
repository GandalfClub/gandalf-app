import { IPublicEventsService } from './interface';
import EventsModel, { IPublicEventsModel } from './model';
import { Types } from 'mongoose';

const PublicEventsService: IPublicEventsService = {
	async getAllEvents(): Promise<IPublicEventsModel[]> {
		try {
			return await EventsModel.find({});
		} catch (error) {
			throw new Error(error.message);
		}
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
