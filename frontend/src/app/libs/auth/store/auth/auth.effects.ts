import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { AuthRepository } from '../../services/auth-repository.service';
import {
	AuthActionTypes,
	SignIn,
	SignInSuccess,
	SignInFailure,
	SignInByGithub,
	SignUp,
	SignUpFailure,
	SignUpSuccess,
	SignOut,
	SignOutSuccess,
	SignOutFailure,
	UpdateUserInfo,
	UpdateUserInfoSuccess,
	LoadUser,
	LoadUserSuccess,
	LoadUserFail } from './auth.actions';
import { Observable, of, from } from 'rxjs';
import { map, switchMap, exhaustMap, catchError, tap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { Action } from '@ngrx/store';
import { User } from '../../models/user';
import { AuthConverter } from '../../services/auth-converter.service';
import { AuthResponse } from '../../models/auth-response';
import { UserDto } from '../../models/user-dto';
// import { ActionType, GetEventsFail, GetEventsSuccess } from '../../../landing/store/events/events.actions';
// import { EventDto } from '../../../landing/models/event-dto';
// import { AuthFacadeService } from './auth.facade';
// import { EntityWrapper } from '../../models/entity-wraper';
// import { UserClaim } from 'src/app/libs/admin-role-management/models/user-claims.enum';

@Injectable()
export class AuthEffects {
	@Effect()
	public SignIn: Observable<Action> = this.actions.pipe(
		ofType<SignIn>(AuthActionTypes.SignIn),
		exhaustMap((action: SignIn) => {
			return from(this.fireAuthService.auth.signInWithEmailAndPassword(action.payload.email, action.payload.password));
		}),
		map((userModel: auth.UserCredential) => userModel.user),
		switchMap((firebaseUser: firebase.User) => {
			return this.authRepository.signIn(firebaseUser.email, firebaseUser.uid).pipe(
				map((authResponse: AuthResponse) => {
					return new SignInSuccess(this.authConverter.convertFromDto(authResponse.user));
				})
			);
		}),
		catchError((error: Error) => {
			return of(new SignInFailure(error));
		})
	);

	@Effect()
	public SignInByGithub: Observable<Action> = this.actions.pipe(
		ofType<SignInByGithub>(AuthActionTypes.SignInByGithub),
		exhaustMap(() => {
			return from(this.fireAuthService.auth.signInWithPopup(new auth.GithubAuthProvider()));
		}),
		map((userModel: auth.UserCredential) => userModel.user),
		switchMap((firebaseUser: firebase.User) => {
			return this.authRepository.signInByGithub(firebaseUser.email, firebaseUser.uid).pipe(
				map((authResponse: AuthResponse) => {
					return new SignInSuccess(this.authConverter.convertFromDto(authResponse.user));
				})
			);
		}),
		catchError((error: Error) => {
			return of(new SignInFailure(error));
		})
	);

	@Effect()
	public SignUp: Observable<Action> = this.actions.pipe(
		ofType<SignUp>(AuthActionTypes.SignUp),
		exhaustMap((action: SignUp) => {
			return from(this.fireAuthService.auth.createUserWithEmailAndPassword(action.payload.email, action.payload.password));
		}),
		map((userModel: auth.UserCredential) => userModel.user),
		switchMap((firebaseUser: firebase.User) => {
			return this.authRepository.signUp(firebaseUser.email, firebaseUser.uid).pipe(
				map((authResponse: AuthResponse) => {
					return new SignUpSuccess(this.authConverter.convertFromDto(authResponse.user));
				})
			);
		}),
		catchError((error: Error) => {
			return of(new SignUpFailure(error));
		})
	);

	@Effect()
	public updateUser$: Observable<Action> = createEffect(() =>
		this.actions.pipe(
			ofType(AuthActionTypes.UpdateUserInfo),
			map((action: UpdateUserInfo) => action.payload.user),
			exhaustMap((user: User) =>
				this.authRepository
					.updateUser(this.authConverter.convertToDto(user))
					.pipe(map((userDto: UserDto) => new UpdateUserInfoSuccess({ user: this.authConverter.convertFromDto(userDto) })))
			)
		)
	);

	@Effect()
	public LoadUserBack: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.LoadUser),
		exhaustMap(() =>
			this.authRepository
				.loadUser()
				.pipe(map((userDto: UserDto) => new LoadUserSuccess({ user: this.authConverter.convertFromDto(userDto) })))
		),
		catchError((error: Error) => of(new LoadUserFail({ message: error })))
	);

	@Effect()
	public SignOut: Observable<Action> = this.actions.pipe(
		ofType(AuthActionTypes.SignOut),
		exhaustMap(() => {
			return this.authRepository.signOut();
		}),
		map(() => {
			return new SignOutSuccess();
		}),
		catchError((error: Error) => {
			return of(new SignOutFailure({ message: error }));
		})
	);

	constructor(
		private actions: Actions,
		private authRepository: AuthRepository,
		private fireAuthService: AngularFireAuth,
		private authConverter: AuthConverter,
	) {}
}
