import { EventDto } from './event-dto';

export interface EventsResponse {
	status: number;
	events: EventDto[];
	message: string;
}
