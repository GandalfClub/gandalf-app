import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { SolutionStatus, Task } from '../../landing/models/task.model';
import { EventInfoService } from '../services/event-info.service';
import { EventInfoFacadeService } from './event-info-facade.service';
import { ActionTypes, FetchTasks, FetchTasksError, FetchTasksSuccess, SetSolution } from './event-info.actions';

@Injectable()
export class EventInfoEffects {
	@Effect()
	public FetchTasks: Observable<Action> = this.actions$.pipe(
		ofType(ActionTypes.FetchTasks),
		switchMap((_: FetchTasks) => this.eventInfoService.fetchTasks()
			.pipe(
				map((tasks: Task[]) => new FetchTasksSuccess(tasks)),
				catchError((error: Error) => of(new FetchTasksError(error)))
			))
	);

	constructor(
		private actions$: Actions,
		private eventInfoService: EventInfoService,
	) { }
}
