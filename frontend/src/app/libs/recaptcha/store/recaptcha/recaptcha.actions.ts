import { Action } from '@ngrx/store';
import { Recaptcha } from '../../models/recaptcha';

export enum RecaptchaActionTypes {
	GetRecaptchaStatus = '[Recaptcha] Get Recaptcha',
	GetRecaptchaStatusSuccess = '[Recaptcha] Get Recaptcha Success',
	GetRecaptchaStatusFailure = '[Recaptcha] Get Recaptcha Failure'
}

export class GetRecaptchaStatus implements Action {
	public readonly type: RecaptchaActionTypes = RecaptchaActionTypes.GetRecaptchaStatus;
	constructor(public payload: string) {}
}

export class GetRecaptchaStatusSuccess implements Action {
	public readonly type: RecaptchaActionTypes = RecaptchaActionTypes.GetRecaptchaStatusSuccess;
	constructor() {}
}

export class GetRecaptchaStatusFailure implements Action {
	public readonly type: RecaptchaActionTypes = RecaptchaActionTypes.GetRecaptchaStatusFailure;
	constructor(public payload: Error) {}
}

export type RecaptchaActions =
	| GetRecaptchaStatus
	| GetRecaptchaStatusSuccess;
