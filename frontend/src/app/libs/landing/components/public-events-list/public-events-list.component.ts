import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from '../../store/events';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';

@Component({
	selector: 'app-public-events-list',
	templateUrl: './public-events-list.component.html',
	styleUrls: ['./public-events-list.component.scss'],
})
export class PublicEventsListComponent implements OnInit {
	public currentEvents$: Observable<Event[]>;
	public currentEventsLoadingState$: Observable<boolean>;
	public currentEventsError$: Observable<Error>;
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();
		this.currentEvents$ = this.eventsFacadeService.events$;
		this.currentEventsLoadingState$ = this.eventsFacadeService.eventsLoadingState$;
		this.currentEventsError$ = this.eventsFacadeService.eventsError$;
	}
}
