import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import {
	EventDescriptionActionTypes,
	LoadEventDescription,
	LoadEventDescriptionsSuccess,
	LoadEventDescriptionsFailure,
} from './event-description.actions';
import { Action } from '@ngrx/store';
import { EventsRepository } from 'src/app/libs/landing/services/events-repository.service';
import { EventDto } from 'src/app/libs/landing/models/event-dto';
import { EventConverter } from 'src/app/libs/landing/services/event-converter.service';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Injectable()
export class EventDescriptionEffects {
	@Effect()
	public GetEventdescription: Observable<Action> = this.actions$.pipe(
		ofType(EventDescriptionActionTypes.LoadEventDescription),
		switchMap((action: LoadEventDescription) =>
			this.eventsRepository.getEvents().pipe(
				map((events: EventDto[]) => {
					const event: EventDto = events.find((item: EventDto) => item._id === action.payload);
					return event;
				}),
				switchMap((event: EventDto) => {
					return this.authFacadeService.user$.pipe(
						map((user: EntityWrapper<User>) => {
							return new LoadEventDescriptionsSuccess({
								event: this.eventConverter.convertFromDto([event])[0],
								userLoginStatus: user.status === EntityStatus.Success,
							});
						})
					);
				}),
				catchError((error: Error) => of(new LoadEventDescriptionsFailure(error)))
			)
		)
	);

	constructor(
		private actions$: Actions,
		private eventsRepository: EventsRepository,
		private eventConverter: EventConverter,
		private authFacadeService: AuthFacadeService
	) {}
}
