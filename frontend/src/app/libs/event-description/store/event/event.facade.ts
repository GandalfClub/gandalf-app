import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadEvent, RegForEvent } from './event.actions';
import { EventState } from './event-state';
import { Observable } from 'rxjs';
import { selectEvent, selectEventValue } from './event.selectors';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { Event } from '../../../landing/models/event';
import { EventParticipation } from '../../../landing/models/event-participation.class';

@Injectable({
	providedIn: 'root',
})
export class EventFacadeService {
	constructor(private store: Store<EventState>) { }

	public get event$(): Observable<EntityWrapper<Event>> {
		return this.store.pipe(select(selectEvent));
	}

	public get eventValue$(): Observable<Event> {
		return this.store.pipe(select(selectEventValue));
	}

	public regForEvent(participation: EventParticipation): void {
		this.store.dispatch(new RegForEvent(participation));
	}

	public loadEvent(id: string): void {
		this.store.dispatch(new LoadEvent(id));
	}
}
