import { Injectable } from '@angular/core';
import { Event } from '../../landing/models/event';
import { EventDto } from '../../landing/models/event-dto';

@Injectable({
	providedIn: 'root',
})
export class EventConverter {
	public convertFromDto(eventDto: EventDto): Event {
		return (({ _id, ...object }: EventDto) => ({ id: _id, ...object }))(eventDto);
	}
}
