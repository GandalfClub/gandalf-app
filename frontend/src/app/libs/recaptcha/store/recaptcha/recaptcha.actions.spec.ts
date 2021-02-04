import * as RecaptchaActions from './recaptcha.actions';
import { Recaptcha } from '../../models/recaptcha';
import { RecaptchaActionTypes, GetRecaptchaStatus, GetRecaptchaStatusSuccess, GetRecaptchaStatusFailure } from './recaptcha.actions';
import { RecaptchaState } from '../../models/recaptcha-state';
import { recaptchaReducer, initialState } from './recaptcha.reducer';

describe('Get Recaptcha Status Success', () => {
	let action: RecaptchaActions.GetRecaptchaStatusSuccess;
	beforeEach(() => {
		action = new RecaptchaActions.GetRecaptchaStatusSuccess();
	});
	it('should create SignInSuccess action', () => {
		expect({ ...action }).toEqual({
			type: RecaptchaActions.RecaptchaActionTypes.GetRecaptchaStatusSuccess,
		});
	});
});

describe('Get Recaptcha Status Failure', () => {
	let action: RecaptchaActions.GetRecaptchaStatusFailure;
	const payload: Error = {
		name: 'test error',
		message: 'this is test error',
	};
	beforeEach(() => {
		action = new RecaptchaActions.GetRecaptchaStatusFailure(payload);
	});
	it('should create SignInFailure action', () => {
		expect({ ...action }).toEqual({
			type: RecaptchaActions.RecaptchaActionTypes.GetRecaptchaStatusFailure,
			payload,
		});
	});
});

describe('Get Recaptcha Status', () => {
	let action: RecaptchaActions.GetRecaptchaStatus;
	const payload = {
		token: 'testToken'
	};
	beforeEach(() => {
		action = new RecaptchaActions.GetRecaptchaStatus(payload);
	});
	it('should create Get Recaptcha Status action', () => {
		expect({ ...action }).toEqual({
			type: RecaptchaActions.RecaptchaActionTypes.GetRecaptchaStatus,
			payload,
		});
	});
});
