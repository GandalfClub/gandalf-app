import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Event } from '../../models/event';
import { EventsFacadeService } from '../../store/events';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit, OnDestroy {
	private destroy$: Subject<boolean> = new Subject<boolean>();
	public currentEvents: Event[] = [];
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();
		this.eventsFacadeService.events$.pipe(takeUntil(this.destroy$)).subscribe((events: Event[]) => {
			this.currentEvents = events;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
