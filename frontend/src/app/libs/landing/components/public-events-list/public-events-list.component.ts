import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';
import { EventsFacadeService } from '../../store/events/events.facade';

@Component({
	selector: 'app-public-events-list',
	templateUrl: './public-events-list.component.html',
	styleUrls: ['./public-events-list.component.scss'],
})
export class PublicEventsListComponent {
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public get events$(): Observable<Event[]> {
		return this.eventsFacadeService.eventsValue$;
	}
}
