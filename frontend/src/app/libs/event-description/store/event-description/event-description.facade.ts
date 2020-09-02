import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadEvent } from './event-description.actions';
import { EventDescriptionState } from './event-description-state';
import { Observable } from 'rxjs';
import { selectEvent, selectEventValue } from './event-description.selectors';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { Event } from '../../../landing/models/event';

@Injectable({
	providedIn: 'root',
})
export class EventFacadeService {
	constructor(private store: Store<EventDescriptionState>) {}

	public get event$(): Observable<EntityWrapper<Event>> {
		return this.store.pipe(select(selectEvent));
	}

	public get eventValue$(): Observable<Event> {
		return this.store.pipe(select(selectEventValue));
	}

	public getEvent(id: string): void {
		this.store.dispatch(new LoadEvent(id));
	}
}
