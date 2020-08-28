import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	GetUserFromAuthAction,
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionTypes,
} from './user.actions';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { TypedAction } from '@ngrx/store/src/models';
import { IUser } from '../../model/user';
import { UserService } from '../../service/user-service';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';

@Injectable()
export class UserEffects {
	public getUser$: Observable<{} & TypedAction<UserActionTypes>> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.GetUserFromAuth),
			// map((action: GetUserFromAuthAction) => action),
			exhaustMap(() =>
				this.authFacadeService.user$.pipe(
					map((user: EntityWrapper<User>) => user.value['user']),
					map((user: IUser) => new GetUserFromAuthSuccessfullyAction({ user }))
				)
			),
			catchError((err: Error) => of(new GetUserFromAuthFailedAction({ message: err.message })))
		)
	);

	public updateUser$: Observable<{} & TypedAction<UserActionTypes>> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.UpdateUser),
			map((action: UpdateUserAction) => action.payload.user),
			exhaustMap((user: IUser) =>
				this.api.updateUser(user).pipe(map((updatedUser: IUser) => new UpdateUserInfoSuccessfulyAction({ user: updatedUser })))
			),
			catchError((err: Error) => of(new UpdateUserInfoFailedAction({ message: err.message })))
		)
	);

	constructor(private actions$: Actions, private api: UserService, private authFacadeService: AuthFacadeService) {}
}
