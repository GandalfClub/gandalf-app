import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user';

export enum UsersActionType {
	LoadUsers = '[Users] Load Users',
	LoadUsersSuccess = '[Users] Load Users Success',
	LoadUsersFail = '[Users] Load Users Fail',
	ToggleEventManagerRole = '[Users] Toggle EventManager role',
	ToggleEventManagerRoleSuccess = '[Users] Toggle EventManager role success',
	ToggleEventManagerRoleFail = '[Users] Toggle EventManager role fail',
	RemoveUser = '[Users] Remove User',
	RemoveUserSuccess = '[Users] Remove User success',
	RemoveUserFail = '[Users] Remove User fail',
	RemoveSelectedUsers = '[Users] Remove Selected Users ',
	RemoveSelectedUsersSuccess = '[Users] Remove Selected Users Success',
	RemoveSelectedUsersFail = '[Users] Remove Selected Users Fail',
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
	constructor(public payload: User) { }
}
export class ToggleEventManagerRoleFail implements Action {
	public readonly type: UsersActionType.ToggleEventManagerRoleFail = UsersActionType.ToggleEventManagerRoleFail;
	constructor(public payload: Error) { }
}

export class RemoveUser implements Action {
	public readonly type: UsersActionType.RemoveUser = UsersActionType.RemoveUser;
	constructor(public payload: User) {}
}

export class RemoveUserSuccess implements Action {
	public readonly type: UsersActionType.RemoveUserSuccess = UsersActionType.RemoveUserSuccess;
	constructor(public payload: User) { }
}
export class RemoveUserFail implements Action {
	public readonly type: UsersActionType.RemoveUserFail = UsersActionType.RemoveUserFail;
	constructor(public payload: Error) { }
}

export class RemoveSelectedUsers implements Action {
	public readonly type: UsersActionType.RemoveSelectedUsers = UsersActionType.RemoveSelectedUsers;
	constructor(public payload: string[]) {}
}

export class RemoveSelectedUsersSuccess implements Action {
	public readonly type: UsersActionType.RemoveSelectedUsersSuccess = UsersActionType.RemoveSelectedUsersSuccess;
	constructor(public payload: string[]) { }
}
export class RemoveSelectedUsersFail implements Action {
	public readonly type: UsersActionType.RemoveSelectedUsersFail = UsersActionType.RemoveSelectedUsersFail;
	constructor(public payload: Error) { }
}

export type UsersActions =
LoadUsers |
LoadUsersSuccess |
LoadUsersFail |
ToggleEventManagerRole |
ToggleEventManagerRoleSuccess |
ToggleEventManagerRoleFail |
RemoveUser |
RemoveUserSuccess |
RemoveUserFail |
RemoveSelectedUsers |
RemoveSelectedUsersSuccess |
RemoveSelectedUsersFail
;
