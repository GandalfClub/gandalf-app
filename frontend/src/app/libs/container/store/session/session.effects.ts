import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { map, tap, exhaustMap } from 'rxjs/operators';
import { MockSigninService } from '../../../sign-in/mock-signin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionType, Signin, SigninSucces } from './session.actions';
import { IUser, IIsLogged } from '../../models/user';

@Injectable()
export class SessionEffects {
	@Effect()
	public signIn$: Observable<SigninSucces> = this.actions$.pipe(
		ofType(ActionType.SIGN_IN),
		map((action: Signin) => action.payload),
		exhaustMap((signinUser: IUser) => this.api.signIn(signinUser).pipe(map((user: IIsLogged) => new SigninSucces(user))))
	);

	@Effect({ dispatch: false })
	public SigninSucces$: Observable<never> = this.actions$.pipe(
		ofType(ActionType.SIGNIN_SUCCES),
		tap(() => this.router.navigate(['/']))
	);

	constructor(private actions$: Actions, private api: MockSigninService, private router: Router) {}
}
