import { IPublicEventsModel } from './model';

export interface IPublicEventsService {
	getAllEvents(): Promise<IPublicEventsModel[]>;

	/**
	 * @param {string} code
	 * @returns {Promise<IUserModel>}
	 * @memberof IUserService
	 */
	getEvent(id: string): Promise<IPublicEventsModel>;
}
