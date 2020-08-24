import { EventDto } from './eventDto';

export interface EventsResponse {
	status: number;
	events: EventDto[];
	message: string;
}
