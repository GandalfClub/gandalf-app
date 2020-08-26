import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActionType, GetEventsSuccess, GetEventsFail } from './events.actions';
import { EventsRepository } from '../../services/events-repository.service';
import { EventDto } from '../../models/event-dto';
import { EventConverter } from '../../services/event-converter.service';
import { Action } from '@ngrx/store';

@Injectable()
export class EventsEffects {
	@Effect()
	public GetEvents: Observable<Action> = this.actions$.pipe(
		ofType(ActionType.GetEvents),
		exhaustMap(() =>
			this.eventsRepository.getEvents().pipe(map((events: EventDto[]) => new GetEventsSuccess(this.eventConverter.convertFromDto(events))))
		),
		catchError((error: Error) => of(new GetEventsFail(error)))
	);

	constructor(private actions$: Actions, private eventsRepository: EventsRepository, private eventConverter: EventConverter) {}
}
