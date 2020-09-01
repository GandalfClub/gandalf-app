import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user';
import { UserChanges } from '../../model/user-changes';

export enum UserActionTypes {
	GetUserFromAuth = '[User] Get user from auth',
	GetUserFromAuthSuccess = '[User] Get user from auth success',
	GetUserFromAuthFail = '[User] Get user from auth failed',
	UpdateUser = '[User] Update user',
	UpdateUserInfoSuccessfuly = '[User] Update user success',
	UpdateUserInfoFailed = '[User] Update user failed',
}

export class GetUserFromAuthAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuth;
}

export class GetUserFromAuthSuccessfullyAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuthSuccess;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class GetUserFromAuthFailedAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuthFail;
	constructor(
		public payload: {
			message: string;
		}
	) {}
}

export class UpdateUserAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUser;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class UpdateUserInfoSuccessfulyAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUserInfoSuccessfuly;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class UpdateUserInfoFailedAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUserInfoFailed;
	constructor(
		public payload: {
			message: string;
		}
	) {}
}

export type UserActionType =
	| GetUserFromAuthAction
	| GetUserFromAuthSuccessfullyAction
	| GetUserFromAuthFailedAction
	| UpdateUserAction
	| UpdateUserInfoSuccessfulyAction
	| UpdateUserInfoFailedAction;
