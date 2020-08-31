import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventDto } from '../models/event-dto';

@Injectable({
	providedIn: 'root',
})
export class EventConverter {
	public convertFromDto(eventsDto: EventDto[]): Event[] {
		return eventsDto.map(({ _id, ...dto }: EventDto) => ({ id: _id, ...dto }));
	}
}
