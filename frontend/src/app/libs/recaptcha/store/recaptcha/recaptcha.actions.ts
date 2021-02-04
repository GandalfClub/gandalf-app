import { Action } from '@ngrx/store';
import { Recaptcha } from '../../models/recaptcha';

export enum RecaptchaActionTypes {
	GetRecaptchaStatus = '[Recaptcha] Get Recaptcha',
	GetRecaptchaStatusSuccess = '[Recaptcha] Get Recaptcha Success',
	GetRecaptchaStatusFailure = '[Recaptcha] Get Recaptcha Failure'
}

export class GetRecaptchaStatus implements Action {
	public readonly type: RecaptchaActionTypes.GetRecaptchaStatus = RecaptchaActionTypes.GetRecaptchaStatus;
	constructor(public payload: {
		token
	}) {}
}

export class GetRecaptchaStatusSuccess implements Action {
	public readonly type: RecaptchaActionTypes.GetRecaptchaStatusSuccess = RecaptchaActionTypes.GetRecaptchaStatusSuccess;	
	constructor() {}
}

export class GetRecaptchaStatusFailure implements Action {
	public readonly type: RecaptchaActionTypes.GetRecaptchaStatusFailure = RecaptchaActionTypes.GetRecaptchaStatusFailure;
	constructor(public payload: Error) {}
}

export type RecaptchaActions =
	| GetRecaptchaStatus
	| GetRecaptchaStatusSuccess
	| GetRecaptchaStatusFailure;
