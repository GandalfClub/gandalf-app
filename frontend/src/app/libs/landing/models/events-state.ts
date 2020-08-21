import { Event } from '../models/event';

export interface EventsState {
	events: Event[];
	startDate: Date;
	endDate: Date;
	lodaingEvents: boolean;
	getEventsError: any;
}
