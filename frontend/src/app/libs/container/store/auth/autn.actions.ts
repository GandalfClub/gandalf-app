import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoadAutns = '[Autn] Load Autns',
  Login = '[Auth] Login',  
  LoginByGithub = '[Auth] Login by Github',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
}



export class LoadAutns implements Action {
  readonly type = AuthActionTypes.LoadAutns;
}

export class LogInByGithub implements Action{
  readonly type = AuthActionTypes.LoginByGithub;
}

export class LogIn implements Action {
  readonly type = AuthActionTypes.Login;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
  readonly type = AuthActionTypes.LoginSuccess;
  constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LoginFailure;
  constructor(public payload: any) {}
}

export type AuthActions = LoadAutns | LogIn | LogInSuccess | LogInFailure; 
