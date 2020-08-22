import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { EventDto } from '../models/eventDto';

@Injectable({
	providedIn: 'root',
})
export class EventConverterService {
	public event: Event = {
		id: '',
		title: '',
		description: '',
		created: null,
		startDate: null,
		startTime: null,
		endDate: null,
		endTime: null,
	};
	public events: Event[] = [];

	public convertFromDto(eventsDto: EventDto[]): Event[] {
		eventsDto.forEach((eventDto: EventDto) => {
			Object.keys(this.event).forEach((key: string) => {
				this.event[key] = eventDto[key];
				this.event.id = eventDto._id;
			});
			this.events.push({ ...this.event, ...this.event });
		});
		return this.events;
	}
}
