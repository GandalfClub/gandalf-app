import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from '../../store/events';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';

@Component({
	selector: 'app--events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
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
