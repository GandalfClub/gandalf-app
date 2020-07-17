import { Action } from '@ngrx/store';
import { UserCredentials } from 'src/app/libs/models/userCredentials';
import { User } from 'src/app/libs/models/user';

export enum AuthActionTypes {
	Login = '[Auth] Login',
	LoginByGithub = '[Auth] Login by Github',
	LoginSuccess = '[Auth] Login Success',
	LoginFailure = '[Auth] Login Failure',
}

export class LogIn implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.Login;
	constructor(public payload: UserCredentials) { }
}

export class LogInByGithub implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginByGithub;
}

export class LogInSuccess implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginSuccess;
	constructor(public payload: User) { }
}

export class LogInFailure implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginFailure;
	constructor(public payload: any) { }
}

export type AuthActions = LogIn | LogInSuccess | LogInFailure;
