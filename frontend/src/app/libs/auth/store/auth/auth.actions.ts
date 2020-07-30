import { Action } from '@ngrx/store';
import { UserCredentials } from '../../models/user-credentials';
import { User } from '../../models/user';

export enum AuthActionTypes {
	SignIn = '[Auth] Sign In',
	SignInByGithub = '[Auth] Sign In by Github',
	SignInSuccess = '[Auth] Sign In Success',
	SignInFailure = '[Auth] Sign In Failure',
	SignUp = '[Auth] Sign Up',
	SignUpSuccess = '[Auth] Sign Up Success',
	SignUpFailure = '[Auth] Sign Up Failure',
}

export class SignIn implements Action {
	public readonly type: AuthActionTypes.SignIn = AuthActionTypes.SignIn;
	constructor(public payload: UserCredentials) { }
}

export class SignInByGithub implements Action {
	public readonly type: AuthActionTypes.SignInByGithub = AuthActionTypes.SignInByGithub;
}

export class SignInSuccess implements Action {
	public readonly type: AuthActionTypes.SignInSuccess = AuthActionTypes.SignInSuccess;
	constructor(public payload: User) { }
}

export class SignInFailure implements Action {
	public readonly type: AuthActionTypes.SignInFailure = AuthActionTypes.SignInFailure;
	constructor(public payload: Error) { }
}

export class SignUp implements Action {
	public readonly type: AuthActionTypes.SignUp = AuthActionTypes.SignUp;
	constructor(public payload: UserCredentials) { }
}

export class SignUpSuccess implements Action {
	public readonly type: AuthActionTypes.SignUpSuccess = AuthActionTypes.SignUpSuccess;
	constructor(public payload: User) { }
}

export class SignUpFailure implements Action {
	public readonly type: AuthActionTypes.SignUpFailure = AuthActionTypes.SignUpFailure;
	constructor(public payload: Error) { }
}

export type AuthActions = SignIn | SignInByGithub | SignInSuccess | SignInFailure | SignUp | SignUpSuccess | SignUpFailure;
