import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionType, GetEventsSuccessfuly, GetEventsFailed } from './events.actions';
import { Event } from '../../models/event';
import { EventsRepository } from '../../services/events.service';

@Injectable()
export class EventsEffects {
	@Effect()
	public GetEvents: Observable<GetEventsSuccessfuly | GetEventsFailed> = this.actions$.pipe(
		ofType(ActionType.GetEvents),
		exhaustMap(() =>
			this.api.getEvents().pipe(
				map((events: Event[]) => new GetEventsSuccessfuly(events)),
				catchError((error: any) => of(new GetEventsFailed(error)))
			)
		)
	);

	constructor(private actions$: Actions, private api: EventsRepository, private router: Router) {}
}
