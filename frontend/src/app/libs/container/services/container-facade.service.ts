import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { EntityStatus } from '../../auth/models/entity-status';
import { Store } from '@ngrx/store';
import * as ContainerSelectors from '../store/container/container.selectors';
import { HideHeaderAndFooter } from '../store/container/container.actions';
import { State } from '../store/container/container.reducer';

@Injectable({
	providedIn: 'root',
})
export class ContainerFacadeService {
	public fakeNotifications: EntityWrapper<Notification[]> = {
		status: EntityStatus.Success,
		value: [
			{ title: 'Notification 1', content: 'content 1' },
			{ title: 'Notification 2', content: 'content 2' },
		],
	};

	constructor(
		private authFacadeService: AuthFacadeService,
		private containerStore: Store<State>
	) { }

	public get user$(): Observable<EntityWrapper<User>> {
		return this.authFacadeService.user$;
	}

	public get notifications$(): Observable<EntityWrapper<Notification[]>> {
		return of(this.fakeNotifications);
	}

	public signOut(): void {
		this.authFacadeService.signOut();
	}

	public hideElementOnSignIn(): void {
		this.containerStore.dispatch(new HideHeaderAndFooter());
	}

	public get hideHeader(): Observable<boolean> {
		return this.containerStore.select(ContainerSelectors.selectHideHeader);
	}

	public get hideFooter(): Observable<boolean> {
		return this.containerStore.select(ContainerSelectors.selectHideFooter);
	}
}
