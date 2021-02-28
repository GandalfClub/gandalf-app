import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
  EventsActionTypes,
  CreateGeneralEventAction,
  CreateEventActionSuccess,
  CreateEventActionFail,
  CreateTaskEventAction,
  CreateTaskActionSuccess,
} from './event.actions';
import { EventsRepositoryService } from '../services/events-repository.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { GeneralEvent } from './model/model';
import { ITask } from '../../common-components/components/tasks-creator/models/task';

@Injectable()
export class EventsEffects {

	@Effect()
	public CreateGeneralEventEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.CreateGeneralEvent),
		switchMap((action: CreateGeneralEventAction) => {
			return this.eventsRepository.createGeneralEvent(action.payload).pipe(
				map((event: GeneralEvent) => new CreateEventActionSuccess(event)),
				catchError((error: Error) => of(new CreateEventActionFail(error)))
			);
		}),
	);

  @Effect()
  public CreateTaskEventEffect$: Observable<Action> = this.actions$.pipe(
    ofType(EventsActionTypes.CreateTaskEvent),
    switchMap((action: CreateTaskEventAction) => {
      return this.eventsRepository.createTaskEvent(action.payload).pipe(
        map((task: ITask) => new CreateTaskActionSuccess(task)),
        catchError((error: Error) => of(new CreateEventActionFail(error)))
      );
    }),
  );

	constructor(
		private actions$: Actions,
		private eventsRepository: EventsRepositoryService,
	) { }
}
