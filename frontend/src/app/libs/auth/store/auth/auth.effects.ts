import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, LogInByGithub, SignUp, SignUpFailure, SignUpSuccess, } from './autn.actions';
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
				return this.AuthRepository.logIn(user.email, user.uid)
					.pipe(
						map((res: any) => {
							return new LogInSuccess(res);
						}),
						catchError((error: string) => {
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
				return this.AuthRepository.logInByGithub(user.email, user.uid)
					.pipe(
						map((res: any) => {
							return new LogInSuccess(res);
						}),
						catchError((error: string) => {
							return of(new LogInFailure(error));
						})
					);
			}));

	@Effect({ dispatch: false })
	public LogInSuccess: Observable<Action> = this.actions.pipe(
		ofType<LogInSuccess>(AuthActionTypes.LoginSuccess),
	);

	@Effect({ dispatch: false })
	public LogInFailure: Observable<any> = this.actions.pipe(
		ofType<LogInFailure>(AuthActionTypes.LoginFailure),
	);

	@Effect()
	public SignUpIn: Observable<Action> = this.actions
		.pipe(
			ofType<SignUp>(AuthActionTypes.Signup),
			exhaustMap((action: SignUp) => {
				return from(this.fireAuthService.auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password));
			}),
			map((userModel: auth.UserCredential) => userModel.user),
			switchMap((user: firebase.User) => {
				return this.AuthRepository.signUp(user.email, user.uid)
					.pipe(
						map((res: any) => {
							return new SignUpSuccess(res);
						}),
						catchError((error: string) => {
							return of(new SignUpFailure(error));
						})
					);
			}));

	@Effect({ dispatch: false })
	public SignUpSuccess: Observable<Action> = this.actions.pipe(
		ofType<SignUpSuccess>(AuthActionTypes.SignupSuccess),
	);

	@Effect({ dispatch: false })
	public SignUpFailure: Observable<any> = this.actions.pipe(
		ofType<SignUpFailure>(AuthActionTypes.SignupFailure),
	);

	constructor(
		private actions: Actions,
		private AuthRepository: AuthRepository,
		private fireAuthService: AngularFireAuth,
	) { }
}
