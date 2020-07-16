import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, tap, exhaustMap, catchError } from 'rxjs/operators';
import { MockSigninService } from '../../../sign-in/mock-signin.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ActionType, Signin, SigninFailure, SigninSucces } from './session.actions';
import { IUser, IRegisteredUser } from '../../models/user';

@Injectable()
export class SessionEffects {
	@Effect()
	public signIn$: Observable<SigninSucces | SigninFailure> = this.actions$.pipe(
		ofType(ActionType.Signin),
		map((action: Signin) => action.payload),
		exhaustMap((signinUser: IUser) =>
			this.api.signIn(signinUser).pipe(
				map((user: IRegisteredUser) => new SigninSucces(user)),
				tap(() => this.router.navigate(['/'])),
				catchError((error: any) => of(new SigninFailure(error)))
			)
		)
	);

	constructor(private actions$: Actions, private api: MockSigninService, private router: Router) {}
}
