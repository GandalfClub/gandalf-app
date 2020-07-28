import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SignIn, SignInByGithub, SignUp } from './auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { selectUser, selectStatus } from './auth.selectors';
import { EntityWrapper } from '../../models/entity-wraper';

@Injectable({
	providedIn: 'root'
})
export class AuthFacadeService {

	constructor(
		private store: Store<EntityWrapper<User>>
	) { }

	public signIn(email: string, password: string): void {
		this.store.dispatch(new SignIn({ email, password }));
	}

	public signInByGithub(): void {
		this.store.dispatch(new SignInByGithub());
	}

	public signUp(email: string, password: string): void {
		this.store.dispatch(new SignUp({ email, password }));
	}

	get user$(): Observable<User> {
		return this.store.pipe(select(selectUser));
	}

	get status$(): Observable<string> {
		return this.store.pipe(select(selectStatus));
	}
}
