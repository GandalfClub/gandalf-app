import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, AuthActions, LogInByGithub, } from './autn.actions';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {

  @Effect()
  public LogIn: Observable<Action> = this.actions
	.pipe(
	  ofType<LogIn>(AuthActionTypes.Login),
	  exhaustMap((action: LogIn) => {
		return from(this.fireAuthService.auth.signInWithEmailAndPassword(action.payload.email, action.payload.password));
	  }),
	  map((userModel: auth.UserCredential) => userModel.user),
	  switchMap((user: firebase.User) => {
		return this.authService.logIn(user.email, user.uid)
		  .pipe(
			map((res: any) => {
			  console.log(user);
			  return new LogInSuccess(res);
			}),
			catchError((error: string) => {
			  console.log(error);
			  return of(new LogInFailure(error));
			})
		  );
	  }));

  @Effect()
  public LogInByGithub: Observable<Action> = this.actions
	.pipe(
	  ofType<LogInByGithub>(AuthActionTypes.LoginByGithub),
	  exhaustMap(() => {
		return from(this.fireAuthService.auth.signInWithPopup(new auth.GithubAuthProvider()));
	  }),
	  map((userModel: auth.UserCredential) => userModel.user),
	  switchMap((user: firebase.User) => {
		return this.authService.logInByGithub(user.email, user.uid)
		  .pipe(
			map((res: any) => {
			  console.log(user);
			  return new LogInSuccess(res);
			}),
			catchError((error: string) => {
			  console.log(error);
			  return of(new LogInFailure(error));
			})
		  );
	  }));

  @Effect({ dispatch: false })
  public LogInSuccess: Observable<Action> = this.actions.pipe(
	ofType<LogInSuccess>(AuthActionTypes.LoginSuccess),
	tap((action: LogInSuccess) => {
	  alert('Logined wtih ${action}');
	})
  );

  @Effect({ dispatch: false })
  public LogInFailure: Observable<any> = this.actions.pipe(
	ofType<LogInFailure>(AuthActionTypes.LoginFailure),
	tap((error: LogInFailure) => {
	  alert('${error}');
	})
  );

  constructor(
	private actions: Actions,
	private authService: AuthService,
	private fireAuthService: AngularFireAuth,
  ) { }
}
