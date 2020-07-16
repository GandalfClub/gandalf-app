import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISessionState } from '..';
import { IUser } from '../../models/user';
import { Signin } from './session.actions';

@Injectable({
	providedIn: 'root',
})
export class SessionFacadeService {
	constructor(private store: Store<ISessionState>) {}

	public signIn(user: IUser): void {
		this.store.dispatch(new Signin(user));
	}
}
