import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SessionActions from './session.actions';
import { map, tap, exhaustMap } from 'rxjs/operators';
import { MockSigninService } from '../../../sign-in/mock-signin.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ActionType } from './session.actions';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable()
export class SessionEffects {
	public signIn$: Observable<{} & TypedAction<ActionType>> = createEffect(() =>
		this.actions$.pipe(
			ofType<SessionActions.SignInAction>(ActionType.SIGN_IN),
			exhaustMap(({ email, password }: any) => this.api.signIn(email, password)),
			map(({ user, logged }: any) => new SessionActions.UserLoggedAction({ user, isLogged: logged }))
		)
	);

	public userLogged$: Observable<{} & TypedAction<ActionType>> = createEffect(
		() =>
			this.actions$.pipe(
				ofType<SessionActions.UserLoggedAction>(ActionType.USER_LOGGED),
				tap(() => this.router.navigate(['/']))
			),
		{
			dispatch: false,
		}
	);

	constructor(private actions$: Actions, private api: MockSigninService, private router: Router) {}
}
