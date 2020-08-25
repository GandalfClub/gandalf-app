import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from '../../store/events';
import { Observable } from 'rxjs';
import { Event } from '../../models/event';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

@Component({
	selector: 'app-public-events-list',
	templateUrl: './public-events-list.component.html',
	styleUrls: ['./public-events-list.component.scss'],
})
export class PublicEventsListComponent implements OnInit {
	public currentEvents$: Observable<EntityWrapper<Event[]>>;
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();
		this.currentEvents$ = this.eventsFacadeService.events$;
	}
}
