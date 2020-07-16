import { Action } from '@ngrx/store';
import { IUser, IIsLogged } from '../../models/user';

export enum ActionType {
	SIGN_IN = '[Session/API] Sign in',
	SIGNIN_SUCCES = '[Session/API] Login Succes',
}

export class Signin implements Action {
	public readonly type: ActionType = ActionType.SIGN_IN;
	constructor(public payload: IUser) {}
}

export class SigninSucces implements Action {
	public readonly type: ActionType = ActionType.SIGNIN_SUCCES;
	constructor(public payload: IIsLogged) {}
}

export type SessionActionTypes = Signin | SigninSucces;
