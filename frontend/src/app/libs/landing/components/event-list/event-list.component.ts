import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventCardSize } from 'src/app/libs/common-components/components/event-card/models/event-card-size';
import { Event } from '../../models/event';
import { EventListLabelColors } from '../../models/event-list-label-colors.enum';

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

	@Input()
	public labelColor: EventListLabelColors = EventListLabelColors.Light;

	public labelColorDark: EventListLabelColors = EventListLabelColors.Dark;
	public labelColorLight: EventListLabelColors = EventListLabelColors.Light;

	public constructor(private router: Router) {}

	public getSize(event: Event): EventCardSize {
		if (!Boolean(event?.size)) {
			return EventCardSize.S;
		}
		return event.size;
	}

	public navigateToEventPage(id: string): void {
		this.router.navigate([`/event/${id}`]);
	}

}
