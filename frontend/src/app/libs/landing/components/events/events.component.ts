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
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();
		this.currentEvents$ = this.eventsFacadeService.events$;
	}
}
