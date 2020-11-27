import { Injectable } from '@angular/core';
import { EventCard } from '../../landing/models/event';
import { EventDto } from '../../landing/models/event-dto';

@Injectable({
	providedIn: 'root',
})
export class EventConverter {
	public convertFromDto(eventDto: EventDto): EventCard {
		return (({ _id, ...object }: EventDto) => ({ id: _id, ...object }))(eventDto);
	}
}
