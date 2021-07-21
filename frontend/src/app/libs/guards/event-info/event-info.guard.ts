import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EventFacadeService } from '../../event-description/store/event/event.facade';
import { Event } from '../../landing/models/event';
import { EventParticipation } from '../../landing/models/event-participation.class';

@Injectable({
	providedIn: 'root'
})
export class EventInfoGuard implements CanActivateChild {

	constructor(
		private authSevice: AuthFacadeService,
		private eventFacadeService: EventFacadeService
	) { }

	public canActivateChild(): Observable<boolean> {
		const userState: Observable<EntityWrapper<User>> = this.authSevice.user$;
		const event: Observable<Event> = this.eventFacadeService.eventValue$;

		return combineLatest([event, userState]).pipe(
			map(([ev, user]: [Event, EntityWrapper<User>]) => {
				const found: boolean = ev?.eventParticipations.some((evPart: EventParticipation) => evPart.userId === user.value.id && evPart.approved);
				return found;
			}));
	}
}
