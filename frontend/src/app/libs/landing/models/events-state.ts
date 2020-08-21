import { Event } from '../models/event';

export interface EventsState {
	events: Event[];
	loadingEvents: boolean;
	getEventsError: any;
}
