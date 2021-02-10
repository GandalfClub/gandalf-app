import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, exhaustMap, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
	EventActionTypes,
	LoadEvent,
	LoadEventSuccess,
	LoadEventFail,
	RegForEvent,
	RegForEventFail,
	RegForEventSuccess,
} from './event.actions';
import { Action } from '@ngrx/store';
import { EventRepository } from '../../services/event-repository.service';
import { EventDto } from 'src/app/libs/landing/models/event-dto';
import { EventConverter } from '../../services/event-converter.service';
import { EventParticipation } from '../../../landing/models/event-participation.class';

@Injectable()
export class EventEffects {
	@Effect()
	public GetEvent: Observable<Action> = this.actions$.pipe(
		ofType(EventActionTypes.LoadEvent),
		map((action: LoadEvent) => action.payload),
		exhaustMap((id: string) =>
			this.eventRepository.getEvent(id).pipe(map((event: EventDto) => new LoadEventSuccess(this.eventConverter.convertFromDto(event))))
		),
		catchError((error: Error) => of(new LoadEventFail(error)))
	);

	@Effect()
	public RegForEvent: Observable<Action> = this.actions$.pipe(
		ofType<RegForEvent>(EventActionTypes.RegForEvent),
		switchMap((action: RegForEvent) => this.eventRepository
			.regForEvent(action.payload)
			.pipe(
				map((result: EventParticipation) => new RegForEventSuccess(result)))
		),
		catchError((error: Error) => of(new RegForEventFail(error))));

	constructor(
		private actions$: Actions,
		private eventRepository: EventRepository,
		private eventConverter: EventConverter) { }
}
