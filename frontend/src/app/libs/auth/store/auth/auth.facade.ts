import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './auth.reducer';
import { LogIn, LogInByGithub, SignUp } from './autn.actions';

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
}
