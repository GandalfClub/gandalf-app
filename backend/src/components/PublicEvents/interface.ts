import { IPublicEventsModel } from './model';

export interface IPublicEventsService {
    getAllEvents(): Promise<IPublicEventsModel[]>;

    progressCounter(start: string, end: string): number;

    /**
     * @param {string} code
     * @returns {Promise<IUserModel>}
     * @memberof IUserService
     */
    getEvent(id: string): Promise<IPublicEventsModel>;
}
