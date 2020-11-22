import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Notification } from '../models/notification';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { EntityStatus } from '../../auth/models/entity-status';
import { Store } from '@ngrx/store';
import * as SelectorSignIn from '../store/sign-in-page/sign-in-page.selectors';
import { HideHeaderAndFooter } from '../store/sign-in-page/sign-in-page.actions';
import { SignInState } from '../store/sign-in-page/sign-in-page.reducer';

@Injectable({
	providedIn: 'root'
})
export class ContainerFacadeService {

	public fakeNotifications: EntityWrapper<Notification[]> = {
		status: EntityStatus.Success,
		value: [
			{ title: 'Notification 1', content: 'content 1' },
			{ title: 'Notification 2', content: 'content 2' }
		]
	};

	constructor(private authFacadeService: AuthFacadeService, private signInStore: Store<SignInState>) { }

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
		this.signInStore.dispatch(new HideHeaderAndFooter());
	}

	public get hideHeader(): Observable<boolean> {
		return this.signInStore.select(SelectorSignIn.selectHideHeader);
	}

	public get hideFooter(): Observable<boolean> {
		return this.signInStore.select(SelectorSignIn.selectHideFooter);
	}

}
