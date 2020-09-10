import { Action } from '@ngrx/store';
import { User } from 'src/app/libs/auth/models/user';

export enum UsersActionType {
	LoadUsers = '[Users] Load Users',
	LoadUsersSuccess = '[Users] Load Users Success',
	LoadUsersFail = '[Users] Load Users Fail',

	UpdateUser = '[Users] Update user',
	UpdateUserSuccess = '[Users] Update user success',
	UpdateUserFail = '[Users] Update user failed',
}

export class LoadUsers implements Action {
	public readonly type: UsersActionType.LoadUsers = UsersActionType.LoadUsers;
}
export class LoadUsersSuccess implements Action {
	public readonly type: UsersActionType.LoadUsersSuccess = UsersActionType.LoadUsersSuccess;
	constructor(public payload: User[]) {}
}
export class LoadUsersFail implements Action {
	public readonly type: UsersActionType.LoadUsersFail = UsersActionType.LoadUsersFail;
	constructor(public payload: Error) {}
}
export class UpdateUser implements Action {
	public readonly type: UsersActionType.UpdateUser = UsersActionType.UpdateUser;
	constructor(public payload: User) {}
}
export class UpdateUserSuccess implements Action {
	public readonly type: UsersActionType.UpdateUserSuccess = UsersActionType.UpdateUserSuccess;
}
export class UpdateUserFail implements Action {
	public readonly type: UsersActionType.UpdateUserFail = UsersActionType.UpdateUserFail;
	constructor(public payload: Error) {}
}

export type UsersActions = LoadUsers | LoadUsersSuccess | LoadUsersFail | UpdateUser | UpdateUserSuccess | UpdateUserFail;
