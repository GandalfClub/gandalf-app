import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UsersActionType, LoadUsersFail, LoadUsersSuccess } from './users.actions';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { Action } from '@ngrx/store';
import { UserDto } from '../../../auth/models/user-dto';
import { AuthConverter } from 'src/app/libs/auth/services/auth-converter.service';

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

	constructor(private actions$: Actions, private usersRepository: UsersRepositoryService, private authConverter: AuthConverter) {}
}
