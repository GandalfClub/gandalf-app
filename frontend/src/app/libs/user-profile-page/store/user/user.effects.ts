import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	UserActionType,
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionTypes,
} from './user.actions';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { IUser } from '../../model/user';
import { UserRepository } from '../../service/user-repository.service';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';

@Injectable()
export class UserEffects {
	public getUser$: Observable<UserActionType> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.GetUserFromAuth),
			exhaustMap(() =>
				this.authFacadeService.user$.pipe(
					map((user: EntityWrapper<User>) => user.value['user']),
					map((user: IUser) => new GetUserFromAuthSuccessfullyAction({ user }))
				)
			),
			catchError((err: Error) => of(new GetUserFromAuthFailedAction({ message: err.message })))
		)
	);

	public updateUser$: Observable<UserActionType> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.UpdateUser),
			map((action: UpdateUserAction) => action.payload.user),
			exhaustMap((user: IUser) =>
				this.api.updateUser(user).pipe(map((updatedUser: IUser) => new UpdateUserInfoSuccessfulyAction({ user: updatedUser })))
			)
		)
	);

	constructor(private actions$: Actions, private api: UserRepository, private authFacadeService: AuthFacadeService) {}
}
