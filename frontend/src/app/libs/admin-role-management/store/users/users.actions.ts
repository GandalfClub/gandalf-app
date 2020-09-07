import { Action } from '@ngrx/store';
import { User } from '../../models/user';

export enum UsersActionType {
	LoadUsers = '[Users] Load Users',
	LoadUsersSuccess = '[Users] Load Users Success',
	LoadUsersFail = '[Users] Load Users Fail',
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

export type UsersActions = LoadUsers | LoadUsersSuccess | LoadUsersFail;
