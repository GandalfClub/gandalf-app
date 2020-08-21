import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetEvents } from './events.actions';
import { EventsState } from '../../models/events-state';
import { Observable } from 'rxjs';
import { selectEvents } from './events.selectors';
import { Event } from '../../models/event';

@Injectable({
	providedIn: 'root',
})
export class EventsFacadeService {
	constructor(private store: Store<EventsState>) {}

	public getEvents(): void {
		this.store.dispatch(new GetEvents());
	}

	get events$(): Observable<Event[]> {
		return this.store.pipe(select(selectEvents));
	}
}
