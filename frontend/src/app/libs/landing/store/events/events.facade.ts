import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GetEvents } from './events.actions';
import { EventsState } from './events-state';
import { Observable } from 'rxjs';
import { selectEvents } from './events.selectors';
import { Event } from '../../models/event';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

@Injectable({
	providedIn: 'root',
})
export class EventsFacadeService {
	constructor(private store: Store<EventsState>) {}

	public get events$(): Observable<EntityWrapper<Event[]>> {
		return this.store.pipe(select(selectEvents));
	}

	public getEvents(): void {
		this.store.dispatch(new GetEvents());
	}
}
