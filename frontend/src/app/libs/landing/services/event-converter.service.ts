import { Injectable } from '@angular/core';
import { EventCard } from '../models/event';
import { EventDto } from '../models/event-dto';

@Injectable({
	providedIn: 'root',
})
export class EventConverter {
	public convertFromDto(eventsDto: EventDto[]): EventCard[] {
		return eventsDto.map(({ _id, ...dto }: EventDto) => ({ id: _id, ...dto }));
	}
}
