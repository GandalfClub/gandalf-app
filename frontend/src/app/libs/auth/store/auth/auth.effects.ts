import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../services/auth.service';
import { AuthActionTypes, LogIn, LogInSuccess, LogInFailure, LogInByGithub, SignUp, SignUpFailure, SignUpSuccess, } from './autn.actions';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Action } from '@ngrx/store';
import { User } from '../../models/user';

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
						map((user: User) => {
							return new LogInSuccess(user);
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
						map((user: User) => {
							return new LogInSuccess(user);
						}),
						catchError((error: string) => {
							return of(new LogInFailure(error));
						})
					);
			}));

	@Effect()
	public SignUp: Observable<Action> = this.actions
		.pipe(
			ofType<SignUp>(AuthActionTypes.Signup),
			exhaustMap((action: SignUp) => {
				return from(this.fireAuthService.auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password));
			}),
			map((userModel: auth.UserCredential) => userModel.user),
			switchMap((user: firebase.User) => {
				return this.AuthRepository.signUp(user.email, user.uid)
					.pipe(
						map((user: User) => {
							return new SignUpSuccess(user);
						}),
						catchError((error: string) => {
							return of(new SignUpFailure(error));
						})
					);
			}));

	constructor(
		private actions: Actions,
		private AuthRepository: AuthRepository,
		private fireAuthService: AngularFireAuth,
	) { }
}
