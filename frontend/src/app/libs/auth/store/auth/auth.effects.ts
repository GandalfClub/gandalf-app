import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../services/auth.service';
import { AuthActionTypes, SignIn, SignInSuccess, SignInFailure, SignInByGithub, SignUp, SignUpFailure, SignUpSuccess, } from './auth.actions';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Action } from '@ngrx/store';
import { User } from '../../models/user';

@Injectable()
export class AuthEffects {

	@Effect()
	public SignIn: Observable<Action> = this.actions
		.pipe(
			ofType<SignIn>(AuthActionTypes.SignIn),
			exhaustMap((action: SignIn) => {
				return from(this.fireAuthService.auth.signInWithEmailAndPassword(action.payload.email, action.payload.password));
			}),
			map((userModel: auth.UserCredential) => userModel.user),
			switchMap((firebaseUser: firebase.User) => {
				return this.authRepository.signIn(firebaseUser.email, firebaseUser.uid)
					.pipe(
						map((user: User) => {
							return new SignInSuccess(user);
						}));
			}),
			catchError((error: Error) => {
				return of(new SignInFailure(error));
			})
		);

	@Effect()
	public SignInByGithub: Observable<Action> = this.actions
		.pipe(
			ofType<SignInByGithub>(AuthActionTypes.SignInByGithub),
			exhaustMap(() => {
				return from(this.fireAuthService.auth.signInWithPopup(new auth.GithubAuthProvider()));
			}),
			map((userModel: auth.UserCredential) => userModel.user),
			switchMap((firebaseUser: firebase.User) => {
				return this.authRepository.signInByGithub(firebaseUser.email, firebaseUser.uid)
					.pipe(
						map((user: User) => {
							return new SignInSuccess(user);
						}));
			}),
			catchError((error: Error) => {
				return of(new SignInFailure(error));
			})
		);

	@Effect()
	public SignUp: Observable<Action> = this.actions
		.pipe(
			ofType<SignUp>(AuthActionTypes.SignUp),
			exhaustMap((action: SignUp) => {
				return from(this.fireAuthService.auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password));
			}),
			map((userModel: auth.UserCredential) => userModel.user),
			switchMap((firebaseUser: firebase.User) => {
				return this.authRepository.signUp(firebaseUser.email, firebaseUser.uid)
					.pipe(
						map((user: User) => {
							return new SignUpSuccess(user);
						}));
			}),
			catchError((error: Error) => {
				return of(new SignUpFailure(error));
			}));

	constructor(
		private actions: Actions,
		private authRepository: AuthRepository,
		private fireAuthService: AngularFireAuth,
	) { }
}
