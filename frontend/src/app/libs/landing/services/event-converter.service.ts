import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventDto } from '../models/eventDto';

@Injectable({
	providedIn: 'root',
})
export class EventConverter {
	public convertFromDto(eventsDto: EventDto[]): Event[] {
		return eventsDto.map((dto: EventDto) => {
			return (({ _id, tasks, participations, maxScore, isActive, users, ...event }: EventDto) => ({ id: _id, ...event }))(dto);
		});
	}
}
