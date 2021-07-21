import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import {
	EventsActionTypes,
	CreateEvent,
	CreateEventSuccess,
	CreateEventFail,
	CreateTaskEventAction,
	CreateTaskActionSuccess,
	CreateTaskActionFail,
	LoadEventTasksSuccess,
	LoadEvent,
	LoadEventSuccess,
	LoadEventFail,
	UpdateEvent,
	UpdateEventSuccess,
	UpdateEventFail,
} from './event.actions';
import { EventsRepositoryService } from '../services/events-repository.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { Router } from '@angular/router';
import { EventDto } from '../../landing/models/event-dto';
import { EventConverter } from '../../landing/services/event-converter.service';
import { Event } from '../../landing/models/event';

@Injectable()
export class EventsEffects {

	@Effect()
	public CreateGeneralEventEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.CreateEvent),
		switchMap((action: CreateEvent) => {
			return this.eventsRepository.createEvent(action.payload).pipe(
				map((eventDto: EventDto) => {
					const [event]: Event[] = this.eventConverter.convertFromDto([eventDto]);
					this.router.navigateByUrl(`/create-event/${event.id}`);
					return new CreateEventSuccess(event);
				}),
				catchError((error: Error) => of(new CreateEventFail(error)))
			);
		}),
	);

	@Effect()
	public CreateTaskEventEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.CreateEventTask),
		switchMap((action: CreateTaskEventAction) => {
			return this.eventsRepository.createTaskEvent(action.payload).pipe(
				map((task: Task) => new CreateTaskActionSuccess(task)),
				catchError((error: Error) => of(new CreateTaskActionFail(error)))
			);
		}),
	);

	@Effect()
	public LoadTasksEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.LoadEventTasks),
		switchMap(() => {
			return this.eventsRepository.loadTasks().pipe(
				map((tasks: Map<Symbol, Task>) => new LoadEventTasksSuccess(tasks)),
				catchError((error: Error) => of(new CreateTaskActionFail(error)))
			);
		}),
	);

	@Effect()
	public LoadEventEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.LoadEvent),
		switchMap((action: LoadEvent) => {
			return this.eventsRepository.loadEvent(action.payload).pipe(
				map((event: Event) => new LoadEventSuccess(event)),
				catchError((error: Error) => of(new LoadEventFail(error)))
			);
		}),
	);

	@Effect()
	public UpdateEventEffect$: Observable<Action> = this.actions$.pipe(
		ofType(EventsActionTypes.UpdateEvent),
		switchMap((action: UpdateEvent) => {
			return this.eventsRepository.updateEvent(action.payload, action.id).pipe(
				map((event: Event) => new UpdateEventSuccess(event)),
				catchError((error: Error) => of(new UpdateEventFail(error)))
			);
		}),
	);

	constructor(
		private actions$: Actions,
		private eventsRepository: EventsRepositoryService,
		private router: Router,
		private eventConverter: EventConverter,
	) { }
}
