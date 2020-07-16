import { Action } from '@ngrx/store';
import { IUser } from '../../models/user';

export enum ActionType {
	SIGN_IN = '[Session/API] Sign in',
	USER_LOGGED = '[Session/API] User logged',
}

export class SignInAction implements Action {
	public readonly type: ActionType = ActionType.SIGN_IN;
	constructor(
		public payload: {
			email: string;
			password: string;
		}
	) {}
}

export class UserLoggedAction implements Action {
	public readonly type: ActionType = ActionType.USER_LOGGED;
	constructor(
		public payload: {
			user: IUser;
			isLogged: boolean;
		}
	) {}
}

export type SessionActionTypes = SignInAction | UserLoggedAction;
