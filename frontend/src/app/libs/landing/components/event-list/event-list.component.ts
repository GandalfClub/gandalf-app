import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { Event } from '../../models/event';

@Component({
	selector: 'app-event-list',
	templateUrl: './event-list.component.html',
	styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

	@Input()
	public events: Event[] = [];

	@Input()
	public quantityLabel: Event[] = [];

	public constructor(private router: Router) {}

	public getSize(event: Event): EventCardSize {
		if (!Boolean(event?.size)) {
			return EventCardSize.S;
		}
		return event.size;
	}

	public navigateToEventsecription(id: string): void {
		this.router.navigate([`/eventsecription/${id}`]);
	}

}
