import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersActionType, LoadUsersFail, LoadUsersSuccess, UpdateUserFail, UpdateUserSuccess, UpdateUser } from './users.actions';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { Action } from '@ngrx/store';
import { UserConverter } from '../../services/user-converter.service';
import { UserDto } from 'src/app/libs/auth/models/user-dto';
import { User } from 'src/app/libs/auth/models/user';
import { AuthConverter } from 'src/app/libs/auth/services/auth-converter.service';
import { AuthRepository } from 'src/app/libs/auth/services/auth-repository.service';

@Injectable()
export class UsersEffects {
	@Effect()
	public GetUsers: Observable<Action> = this.actions$.pipe(
		ofType(UsersActionType.LoadUsers),
		exhaustMap(() =>
			this.usersRepository.getUsers().pipe(map((users: UserDto[]) => new LoadUsersSuccess(this.userConverter.convertFromDto(users))))
		),
		catchError((error: Error) => of(new LoadUsersFail(error)))
	);

	@Effect()
	public updateUser: Observable<Action> = this.actions$.pipe(
		ofType(UsersActionType.UpdateUser),
		map((action: UpdateUser) => action.payload),
		exhaustMap((user: User) =>
			this.authRepository
				.updateUser(this.authConverter.convertToDto(user))
				.pipe(map((userDto: UserDto) => new UpdateUserSuccess(this.authConverter.convertFromDto(userDto))))
		),
		catchError((error: Error) => of(new UpdateUserFail(error)))
	);

	constructor(
		private actions$: Actions,
		private usersRepository: UsersRepositoryService,
		private userConverter: UserConverter,
		private authConverter: AuthConverter,
		private authRepository: AuthRepository
	) {}
}
