import { Component, Input, OnInit } from '@angular/core';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { EventCard } from '../../models/event';

@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

	@Input()
	public events: EventCard[] = [];

	@Input()
	public quantityLabel: EventCard[] = [];

	public getSize(event: EventCard): EventCardSize {
		if (!Boolean(event?.size)) {
			return EventCardSize.S;
		}
		return event.size;
	}

}
