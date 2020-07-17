import { Action } from '@ngrx/store';
import { UserCredentials } from 'src/app/libs/models/userCredentials';
import { User } from 'firebase';

export enum AuthActionTypes {
	Login = '[Auth] Login',
	LoginByGithub = '[Auth] Login by Github',
	LoginSuccess = '[Auth] Login Success',
	LoginFailure = '[Auth] Login Failure',
}
export class LogInByGithub implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginByGithub;
}

export class LogIn implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.Login;
	constructor(public credentials: UserCredentials) { }
}

export class LogInSuccess implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginSuccess;
	constructor(public user: User) { }
}

export class LogInFailure implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoginFailure;
	constructor(public error: string) { }
}

export type AuthActions = LogIn | LogInSuccess | LogInFailure;
