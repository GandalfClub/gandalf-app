import { EntityWraper } from './events-wraper';
import { EventDto } from './eventDto';

export interface EventsResponse {
	events: EntityWraper<EventDto[]>;
}
