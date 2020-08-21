import { IPublicEventsModel } from "./model";

export interface IPublicEventsService {
	getAllEvents(): Promise<IPublicEventsModel[]>;
}
