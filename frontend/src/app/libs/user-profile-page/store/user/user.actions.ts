import { Action } from '@ngrx/store';
import { IUser } from '../../model/user';

export enum UserActionTypes {
  GetUserFromAuth = '[User] Get user from auth',
	GetUserFromAuthSuccessfuly = '[User] Get user from auth success',
	GetUserFromAuthFailed = '[User] Get user from auth failed',
	UpdateUser = '[User] Update user',
	UpdateUserInfoSuccessfuly = '[User] Update user success',
	UpdateUserInfoFailed = '[User] Update user failed',
}

export class GetUserFromAuthAction implements Action {
  public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuth;
}

export class GetUserFromAuthSuccessfullyAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuthSuccessfuly;
	constructor(
		public payload: {
			user: IUser;
		}
	) {}
}

export class GetUserFromAuthFailedAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.GetUserFromAuthFailed;
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
			user: IUser;
		}
	) {}
}

export class UpdateUserInfoSuccessfulyAction implements Action {
	public readonly type: UserActionTypes = UserActionTypes.UpdateUserInfoSuccessfuly;
	constructor(
		public payload: {
			user: IUser;
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
