import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadEventDescription } from './event-description.actions';
import { EventDescriptionState } from './event-description-state';
import { Observable } from 'rxjs';
import { selectEventDescription, selectEventDescriptionValue } from './event-description.selectors';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EventDescription } from '../../models/event-description';

@Injectable({
	providedIn: 'root',
})
export class EventDescriptionFacadeService {
	constructor(private store: Store<EventDescriptionState>) {}

	public get eventDescription$(): Observable<EntityWrapper<EventDescription>> {
		return this.store.pipe(select(selectEventDescription));
	}

	public get eventDescriptionValue$(): Observable<EventDescription> {
		return this.store.pipe(select(selectEventDescriptionValue));
	}

	public getEventDescription(id: string): void {
		this.store.dispatch(new LoadEventDescription(id));
	}
}
