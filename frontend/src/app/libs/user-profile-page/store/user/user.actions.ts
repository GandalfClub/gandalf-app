import { Action } from '@ngrx/store';
import { User } from '../../../auth/models/user';

export enum UserActionTypes {
	GetUserFromAuth = '[User] Get user from auth',
	GetUserFromAuthSuccess = '[User] Get user from auth success',
	GetUserFromAuthFail = '[User] Get user from auth failed',
	UpdateUser = '[User] Update user',
	UpdateUserInfoSuccess = '[User] Update user success',
	UpdateUserInfoFail = '[User] Update user failed',
}

export class GetUserFromAuthAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuth;
}

export class GetUserFromAuthSuccessAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuthSuccess;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class GetUserFromAuthFailAction implements Action {
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

export class UpdateUserInfoSuccessAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUserInfoSuccess;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class UpdateUserInfoFailAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUserInfoFail;
	constructor(
		public payload: {
			message: string;
		}
	) {}
}

export type UserActionType =
	| GetUserFromAuthAction
	| GetUserFromAuthSuccessAction
	| GetUserFromAuthFailAction
	| UpdateUserAction
	| UpdateUserInfoSuccessAction
	| UpdateUserInfoFailAction;
