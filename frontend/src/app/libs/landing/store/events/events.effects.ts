import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActionType, GetEventsSuccessfuly, GetEventsFailed } from './events.actions';
import { EventsRepository } from '../../services/events-repository.service';
import { EventDto } from '../../models/eventDto';
import { EventConverter } from '../../services/event-converter.service';

@Injectable()
export class EventsEffects {
	@Effect()
	public GetEvents: Observable<GetEventsSuccessfuly | GetEventsFailed> = this.actions$.pipe(
		ofType(ActionType.GetEvents),
		exhaustMap(() =>
			this.eventsRepository.getEvents().pipe(
				map((events: EventDto[]) => new GetEventsSuccessfuly(this.eventConverter.convertFromDto(events))),
				catchError((error: Error) => of(new GetEventsFailed(error)))
			)
		)
	);

	constructor(private actions$: Actions, private eventsRepository: EventsRepository, private eventConverter: EventConverter) {}
}
