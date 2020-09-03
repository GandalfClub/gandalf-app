import { EventDto } from '../../landing/models/event-dto';

export interface EventResponse {
	status: number;
	events: EventDto;
	message: string;
}
