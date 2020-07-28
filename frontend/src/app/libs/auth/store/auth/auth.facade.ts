import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AuthState } from '../../models/auth-state';
import { SignIn, SignInByGithub, SignUp } from './auth.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { selectUser, selectIsAdmin, selectIsAuthenticated, selectErrorMessage } from './auth.selectors';

@Injectable({
	providedIn: 'root'
})
export class AuthFacadeService {

	constructor(
		private store: Store<AuthState>
	) { }

	public logIn(email: string, password: string): void {
		this.store.dispatch(new SignIn({ email, password }));
	}

	public loginByGithub(): void {
		this.store.dispatch(new SignInByGithub());
	}

	public signUp(email: string, password: string): void {
		this.store.dispatch(new SignUp({ email, password }));
	}

	get user$(): Observable<User> {
		return this.store.pipe(select(selectUser));
	}

	get isAdmin$(): Observable<boolean> {
		return this.store.pipe(select(selectIsAdmin));
	}

	get isAuthenticated$(): Observable<boolean> {
		return this.store.pipe(select(selectIsAuthenticated));
	}

	get errorMessage$(): Observable<string> {
		return this.store.pipe(select(selectErrorMessage));
	}
}
