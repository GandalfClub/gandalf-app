import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NewEventState } from './newEvent.reducer';
import { SetTitleAction, CreateEventAction } from './newEvent.actions';
import { selectTitleForNewEvent } from './newEvent.selectors';
import { NewEvent } from './model/model';

@Injectable({
	providedIn: 'root',
})
export class NewEventFacadeService {

	constructor(private store: Store<NewEventState>) { }

	public get title$(): Observable<string> {
		return this.store.pipe(select(selectTitleForNewEvent));
	}

	public setTitleForNewEvent(title: string): void {
		this.store.dispatch(new SetTitleAction(title));
	}

	public createNewEvent(event: NewEvent): void {
		this.store.dispatch(new CreateEventAction(event));
	}
}
