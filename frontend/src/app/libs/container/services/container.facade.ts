import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { Claim } from '../models/claim';
import { EntityStatus } from '../../auth/models/entity-status';

@Injectable({
	providedIn: 'root'
})
export class ContainerFacadeService {

	private fakeNotifications: EntityWrapper<Notification[]> = {
		status: EntityStatus.Success,
		value: [
			{ title: 'Notification 1', content: 'content 1' },
			{ title: 'Notification 2', content: 'content 2' }
		]
	};

	private fakeUser: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '1',
			email: undefined,
			isAdmin: undefined,
			claims: [Claim.EventManager],
		}
	};

	constructor(private authFacadeService: AuthFacadeService) { }

	public get user$(): Observable<EntityWrapper<User>> {
		return of(this.fakeUser);
		//	return this.authFacadeService.user$;
	}

	public get notifications$(): Observable<EntityWrapper<Notification[]>> {
		return of(this.fakeNotifications);
	}
}
