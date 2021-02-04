import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { LoadUser, SignOut, SignIn, SignInByGithub, SignUp, UpdateUserInfo } from './auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { selectUser } from './auth.selectors';
import { AuthState } from '../../models/auth-state';
import { EntityWrapper } from '../../models/entity-wraper';

@Injectable({
	providedIn: 'root',
})
export class AuthFacadeService {
	constructor(private store: Store<AuthState>) {}

	public signIn(email: string, password: string): void {
		this.store.dispatch(new SignIn({ email, password }));
	}

	public signInByGithub(): void {
		this.store.dispatch(new SignInByGithub());
	}

	public signUp(user: User): void {
		this.store.dispatch(new SignUp(user));
	}

	public signOut(): void {
		this.store.dispatch(new SignOut());
	}

	public updateUser(user: User): void {
		this.store.dispatch(new UpdateUserInfo({ user }));
	}

	public loadUser(): void {
		this.store.dispatch(new LoadUser());
	}

	get user$(): Observable<EntityWrapper<User>> {
		return this.store.pipe(select(selectUser));
	}
}
