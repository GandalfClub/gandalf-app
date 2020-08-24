import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventDto } from '../models/eventDto';

@Injectable({
	providedIn: 'root',
})
export class EventConverterService {
	public convertFromDto(eventsDto: EventDto[]): Event[] {
		return eventsDto.map((eventDto: EventDto) => {
			const { tasks, participations, maxScore, isActive, users, ...event }: EventDto = eventDto;
			const renamed: ({ _id, ...object }: typeof event) => Event = ({ _id, ...object }: EventDto) => ({ id: _id, ...object });
			return renamed(event);
		});
	}
}
