import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user';

export enum UsersActionType {
	LoadUsers = '[Users] Load Users',
	LoadUsersSuccess = '[Users] Load Users Success',
	LoadUsersFail = '[Users] Load Users Fail',
	ToggleEventManagerRole = '[Users] Toggle EventManager role',
	ToggleEventManagerRoleSuccess = '[Users] Toggle EventManager role',
	ToggleEventManagerRoleFail = '[Users] Toggle EventManager role fail'
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

export class ToggleEventManagerRole implements Action {
	public readonly type: UsersActionType.ToggleEventManagerRole = UsersActionType.ToggleEventManagerRole;
	constructor(public payload: User) {}
}

export class ToggleEventManagerRoleSuccess implements Action {
	public readonly type: UsersActionType.ToggleEventManagerRoleSuccess = UsersActionType.ToggleEventManagerRoleSuccess;
	constructor(public payload: any = null) { }
}
export class ToggleEventManagerRoleFail implements Action {
	public readonly type: UsersActionType.ToggleEventManagerRoleFail = UsersActionType.ToggleEventManagerRoleFail;
	constructor(public payload: Error) { }
}

export type UsersActions =
LoadUsers |
LoadUsersSuccess |
LoadUsersFail |
ToggleEventManagerRole |
ToggleEventManagerRoleSuccess |
ToggleEventManagerRoleFail;
