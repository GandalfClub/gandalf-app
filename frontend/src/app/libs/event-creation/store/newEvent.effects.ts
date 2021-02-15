import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { NewEventsActionTypes, CreateEventAction, CreateEventActionSuccess, CreateEventActionFail } from './newEvent.actions';
import { EventsRepositoryService } from '../services/events-repository.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { NewEvent } from './model/model';

@Injectable()
export class EventsEffects {

	@Effect()
	public CreateEventEffect: Observable<Action> = this.actions$.pipe(
		ofType(NewEventsActionTypes.CreateEvent),
		switchMap((action: CreateEventAction) => {
			return this.eventsRepository.createEvent(action.payload).pipe(
				map((event: NewEvent) => new CreateEventActionSuccess(event)),
				catchError((error: Error) => of(new CreateEventActionFail(error)))
			);
		}),
	);

	constructor(
		private actions$: Actions,
		private eventsRepository: EventsRepositoryService,
	) { }
}
