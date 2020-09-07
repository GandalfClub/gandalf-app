import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersActionType, LoadUsersFail, LoadUsersSuccess } from './users.actions';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { Action } from '@ngrx/store';
import { UserConverter } from '../../services/user-converter.service';
import { UserDto } from '../../models/user-dto';

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

	constructor(private actions$: Actions, private usersRepository: UsersRepositoryService, private userConverter: UserConverter) {}
}
