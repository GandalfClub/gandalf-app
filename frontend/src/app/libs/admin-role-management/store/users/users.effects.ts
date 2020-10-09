import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError, take, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersActionType, LoadUsersFail, LoadUsersSuccess, ToggleEventManagerRoleSuccess, ToggleEventManagerRole } from './users.actions';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { Action } from '@ngrx/store';
import { UserDto } from '../../../auth/models/user-dto';
import { AuthConverter } from 'src/app/libs/auth/services/auth-converter.service';
// import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { User } from 'src/app/libs/auth/models/user';
import { UsersFacadeService } from './users.facade';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

@Injectable()
export class UsersEffects {
	@Effect()
	public GetUsers: Observable<Action> = this.actions$.pipe(
		ofType(UsersActionType.LoadUsers),
		exhaustMap(() =>
			this.usersRepository.getUsers().pipe(map((users: UserDto[]) => new LoadUsersSuccess(this.authConverter.convertUsersFromDto(users))))
		),
		catchError((error: Error) => of(new LoadUsersFail(error)))
	);

	@Effect()
	public SetEventManagerRole: Observable<Action> = this.actions$.pipe(
		ofType(UsersActionType.ToggleEventManagerRole),
		switchMap((action: ToggleEventManagerRole)  => {
				return this.usersRepository.updateUser(action.payload.user).pipe(
					map(() => new ToggleEventManagerRoleSuccess())
				);
			
			
			// subscribe((entityUsers: EntityWrapper<User[]>) => {
			// 	users = entityUsers.value;
			// 	this.usersRepository.updateUser(users.find((user: User) => user.id === changedUser.id));
			// });
		})
	);

	constructor(
		private actions$: Actions,
		private usersRepository: UsersRepositoryService,
		private authConverter: AuthConverter
		) {}
}
