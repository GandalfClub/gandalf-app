import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../container/store/auth/auth.reducer';
import { Observable, from } from 'rxjs';
import { selectAuthState } from '../container/store/auth/auth.selectors';
import { LogIn, LogInByGithub } from '../container/store/auth/autn.actions';
import { UserCredentials } from '../models/userCredentials';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public credentials: UserCredentials = new UserCredentials();
	public getState: Observable<any>;
	public errorMessage: string | null;

	constructor(
		private store: Store<State>
	) { this.getState = this.store.select(selectAuthState); }

	public ngOnInit(): void {
		this.getState.subscribe((state: State) => {
			this.errorMessage = state.errorMessage;
		});
	}

	public onSubmit(): void {
		this.store.dispatch(new LogIn(this.credentials));
	}

	public loginByGithub(): void {
		this.store.dispatch(new LogInByGithub());
	}
}
