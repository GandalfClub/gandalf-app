import { Action } from '@ngrx/store';
import { IUser, IRegisteredUser } from '../../models/user';

export enum ActionType {
	Signin = '[Session/API] Sign in',
	SigninSucces = '[Session/API] Signin Succes',
	SigninFailure = '[Session/API] Signin Failure',
}

export class Signin implements Action {
	public readonly type: ActionType = ActionType.Signin;
	constructor(public payload: IUser) {}
}

export class SigninSucces implements Action {
	public readonly type: ActionType = ActionType.SigninSucces;
	constructor(public payload: IRegisteredUser) {}
}

export class SigninFailure implements Action {
	public readonly type: ActionType = ActionType.SigninFailure;
	constructor(public payload: Error) {}
}

export type SessionActionTypes = Signin | SigninSucces | SigninFailure;
