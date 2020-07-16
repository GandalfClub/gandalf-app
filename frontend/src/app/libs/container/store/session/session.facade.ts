import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ISessionState } from '..';
import { Observable } from 'rxjs';
import { selectIsUserLogged, selectUser } from './session.selectors';
import { IUser } from '../../models/user';
import { SignInAction } from './session.actions';

@Injectable({
	providedIn: 'root',
})
export class SessionFacadeService {
	constructor(private store: Store<ISessionState>) {}

	get user$(): Observable<IUser> {
		return this.store.pipe(select(selectUser));
	}

	get isUserLogged$(): Observable<boolean> {
		return this.store.pipe(select(selectIsUserLogged));
	}

	public signIn(email: string, password: string): void {
		this.store.dispatch(new SignInAction({ email, password }));
	}
}
