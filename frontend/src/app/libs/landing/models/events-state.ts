import { Event } from '../models/event';
import { EntityWraper } from './events-wraper';

export interface EventsState {
	events: EntityWraper<Event[]>;
}
