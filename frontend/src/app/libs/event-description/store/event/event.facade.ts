import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadEvent } from './event.actions';
import { EventState } from './event-state';
import { Observable } from 'rxjs';
import { selectEvent, selectEventValue } from './event.selectors';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EventCard } from '../../../landing/models/event';

@Injectable({
	providedIn: 'root',
})
export class EventFacadeService {
	constructor(private store: Store<EventState>) {}

	public get event$(): Observable<EntityWrapper<EventCard>> {
		return this.store.pipe(select(selectEvent));
	}

	public get eventValue$(): Observable<EventCard> {
		return this.store.pipe(select(selectEventValue));
	}

	public loadEvent(id: string): void {
		this.store.dispatch(new LoadEvent(id));
	}
}
