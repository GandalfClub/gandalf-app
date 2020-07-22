import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './auth.reducer';
import { LogIn, LogInByGithub, SignUp } from './autn.actions';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { selectUser, selectIsAdmin, selectIsAuthenticated, selectErrorMessage } from './auth.selectors';

@Injectable({
	providedIn: 'root'
})
export class AuthFacadeService {

	constructor(
		private store: Store<State>
	) { }

	public logIn(email: string, password: string): void {
		this.store.dispatch(new LogIn({ email, password }));
	}

	public loginByGithub(): void {
		this.store.dispatch(new LogInByGithub());
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

	get isAuthenticated(): Observable<boolean> {
		return this.store.pipe(select(selectIsAuthenticated));
	}

	get errorMessage$(): Observable<string> {
		return this.store.pipe(select(selectErrorMessage));
	}
}
