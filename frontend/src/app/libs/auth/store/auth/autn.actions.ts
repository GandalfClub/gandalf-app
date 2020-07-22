import { Action } from '@ngrx/store';
import { UserCredentials } from '../../models/userCredentials';
import { User } from '../../models/user';

export enum AuthActionTypes {
	Login = '[Auth] Login',
	LoginByGithub = '[Auth] Login by Github',
	LoginSuccess = '[Auth] Login Success',
	LoginFailure = '[Auth] Login Failure',
	Signup = '[Auth] Login',
	SignupSuccess = '[Auth] SignUp Success',
	SignupFailure = '[Auth] SignUp Failure',
}

export class LogIn implements Action {
	public readonly type: AuthActionTypes.Login = AuthActionTypes.Login;
	constructor(public payload: UserCredentials) { }
}

export class LogInByGithub implements Action {
	public readonly type: AuthActionTypes.LoginByGithub = AuthActionTypes.LoginByGithub;
}

export class LogInSuccess implements Action {
	public readonly type: AuthActionTypes.LoginSuccess = AuthActionTypes.LoginSuccess;
	constructor(public payload: User) { }
}

export class LogInFailure implements Action {
	public readonly type: AuthActionTypes.LoginFailure = AuthActionTypes.LoginFailure;
	constructor(public payload: any) { }
}

export class SignUp implements Action {
	public readonly type: AuthActionTypes.Signup = AuthActionTypes.Signup;
	constructor(public payload: UserCredentials) { }
}

export class SignUpSuccess implements Action {
	public readonly type: AuthActionTypes.SignupSuccess = AuthActionTypes.SignupSuccess;
	constructor(public payload: User) { }
}

export class SignUpFailure implements Action {
	public readonly type: AuthActionTypes.SignupFailure = AuthActionTypes.SignupFailure;
	constructor(public payload: any) { }
}

export type AuthActions = LogIn | LogInSuccess | LogInFailure | SignUp | SignUpSuccess | SignUpFailure;
