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
	SignOut = '[Auth] Sign Out',
	SignOutSuccess = '[Auth] Sign Out Success',
	SignOutFailure = '[Auth] Sign Out Failure',
	UpdateUserInfo = '[Auth] Update user',
	UpdateUserInfoSuccess = '[Auth] Update user Success',
	UpdateUserInfoFail = '[Auth] Update user Failure',
	LoadUser = '[Auth] Load user',
	LoadUserSuccess = '[Auth] Load user Success',
	LoadUserFail = '[Auth] Load user Failure',
	GetRecaptchaStatus = '[Auth] Get Recaptcha',
	GetRecaptchaStatusSuccess = '[Auth] Get Recaptcha Success',
	GetRecaptchaStatusFailure = '[Auth] Get Recaptcha Failure'
}

export class SignIn implements Action {
	public readonly type: AuthActionTypes.SignIn = AuthActionTypes.SignIn;
	constructor(public payload: UserCredentials) {}
}

export class SignInByGithub implements Action {
	public readonly type: AuthActionTypes.SignInByGithub = AuthActionTypes.SignInByGithub;
}

export class SignInSuccess implements Action {
	public readonly type: AuthActionTypes.SignInSuccess = AuthActionTypes.SignInSuccess;
	constructor(public payload: User) {}
}

export class SignInFailure implements Action {
	public readonly type: AuthActionTypes.SignInFailure = AuthActionTypes.SignInFailure;
	constructor(public payload: Error) {}
}

export class SignUp implements Action {
	public readonly type: AuthActionTypes.SignUp = AuthActionTypes.SignUp;
	constructor(public payload: User) {}
}

export class SignUpSuccess implements Action {
	public readonly type: AuthActionTypes.SignUpSuccess = AuthActionTypes.SignUpSuccess;
	constructor(public payload: User) {}
}

export class SignUpFailure implements Action {
	public readonly type: AuthActionTypes.SignUpFailure = AuthActionTypes.SignUpFailure;
	constructor(public payload: Error) {}
}

export class UpdateUserInfo implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.UpdateUserInfo;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class UpdateUserInfoSuccess implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.UpdateUserInfoSuccess;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class UpdateUserInfoFail implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.UpdateUserInfoFail;
	constructor(
		public payload: {
			message: Error;
		}
	) {}
}

export class LoadUser implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoadUser;
}

export class LoadUserSuccess implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoadUserSuccess;
	constructor(
		public payload: {
			user: User;
		}
	) {}
}

export class LoadUserFail implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.LoadUserFail;
	constructor(
		public payload: {
			message: Error;
		}
	) {}
}

export class SignOut implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.SignOut;
}

export class SignOutSuccess implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.SignOutSuccess;
}

export class SignOutFailure implements Action {
	public readonly type: AuthActionTypes = AuthActionTypes.SignOutFailure;
	constructor(
		public payload: {
			message: Error;
		}
	) {}
}

export type AuthActions =
	| SignIn
	| SignInByGithub
	| SignInSuccess
	| SignInFailure
	| SignUp
	| SignUpSuccess
	| SignUpFailure
	| SignOut
	| UpdateUserInfo
	| UpdateUserInfoSuccess
	| UpdateUserInfoFail
	| LoadUser
	| LoadUserSuccess
	| LoadUserFail