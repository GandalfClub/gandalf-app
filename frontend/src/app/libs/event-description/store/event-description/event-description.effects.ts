import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, exhaustMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { EventActionTypes, LoadEvent, LoadEventSuccess, LoadEventFail } from './event-description.actions';
import { Action } from '@ngrx/store';
import { EventRepository } from '../../services/event-repository.service';
import { EventDto } from 'src/app/libs/landing/models/event-dto';
import { EventConverter } from 'src/app/libs/landing/services/event-converter.service';

@Injectable()
export class EventEffects {
	@Effect()
	public GetEvent: Observable<Action> = this.actions$.pipe(
		ofType(EventActionTypes.LoadEvent),
		map((action: LoadEvent) => action.payload),
		exhaustMap((id: string) =>
			this.eventRepository.getEvent(id).pipe(map((event: EventDto) => new LoadEventSuccess(this.eventConverter.convertFromDto([event])[0])))
		),
		catchError((error: Error) => of(new LoadEventFail(error)))
	);

	constructor(private actions$: Actions, private eventRepository: EventRepository, private eventConverter: EventConverter) {}
}
