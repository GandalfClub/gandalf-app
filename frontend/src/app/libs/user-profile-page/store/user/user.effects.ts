import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionTypes,
} from './user.actions';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';
import { IUser } from '../../model/user_';
import { UserService } from '../../service/user-service';
import { AuthActionTypes } from '../../../auth/store/auth/auth.actions';

@Injectable()
export class UserEffects {
	public getUser$: Observable<{} & TypedAction<UserActionTypes>> = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthActionTypes.SignInSuccess),
			map((action: any) => action.payload.user),
			map((user: IUser) => new GetUserFromAuthSuccessfullyAction({ user })),
			catchError((err: Error) => of(new GetUserFromAuthFailedAction({ message: err.message })))
		)
	);

	public updateUser$: Observable<{} & TypedAction<UserActionTypes>> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.UpdateUser),
			map((action: any) => action.payload.user),
			exhaustMap((user: IUser) =>
				this.api.updateUser(user).pipe(
					map((updatedUser: IUser) => new UpdateUserInfoSuccessfulyAction({ user: updatedUser })),
					catchError((err: Error) => of(new UpdateUserInfoFailedAction({ message: err.message })))
				)
			)
		)
	);

	constructor(private actions$: Actions, private api: UserService) {}
}
