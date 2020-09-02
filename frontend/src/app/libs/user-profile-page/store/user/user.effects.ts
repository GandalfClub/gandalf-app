import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
	UserActionType,
	GetUserFromAuthFailAction,
	GetUserFromAuthSuccessAction,
	UpdateUserAction,
	UpdateUserInfoFailAction,
	UpdateUserInfoSuccessAction,
	UserActionTypes,
} from './user.actions';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { UserRepository } from '../../service/user-repository.service';
import { AuthFacadeService } from '../../../auth/store/auth/auth.facade';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';
import { UserConverter } from '../../service/user-converter.service';
import { UserDto } from '../../model/user-dto';

@Injectable()
export class UserEffects {
	public getUser$: Observable<UserActionType> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.GetUserFromAuth),
			exhaustMap(() =>
				this.authFacadeService.user$.pipe(
					map((user: EntityWrapper<User>) => user.value['user']),
					map((user: UserDto) => new GetUserFromAuthSuccessAction({ user: this.userConverter.convertFromDto(user) }))
				)
			),
			catchError((err: Error) => of(new GetUserFromAuthFailAction({ message: err.message })))
		)
	);

	public updateUser$: Observable<UserActionType> = createEffect(() =>
		this.actions$.pipe(
			ofType(UserActionTypes.UpdateUser),
			map((action: UpdateUserAction) => action.payload.user),
			exhaustMap((user: User) =>
				this.api
					.updateUser(this.userConverter.convertToDto(user))
					.pipe(map((updatedUser: User) => new UpdateUserInfoSuccessAction({ user: updatedUser })))
			)
		)
	);

	constructor(
		private actions$: Actions,
		private api: UserRepository,
		private authFacadeService: AuthFacadeService,
		private userConverter: UserConverter
	) {}
}
