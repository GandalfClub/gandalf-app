import { recaptchaReducer, initialState } from './recaptcha.reducer';
import {
	GetRecaptchaStatus,
	GetRecaptchaStatusSuccess,
	GetRecaptchaStatusFailure,
	RecaptchaActions
} from './recaptcha.actions';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityStatus } from '../../models/entity-status';
import { Recaptcha } from '../../models/recaptcha';

describe('RecaptchaReducers', () => {
	describe('Init', () => {
		const action: RecaptchaActions = {} as RecaptchaActions;
		let result: RecaptchaState;
		beforeEach(() => {
			result = recaptchaReducer(initialState, action);
		});
		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('GetRecaptchaStatusSuccess', () => {
		let action: RecaptchaActions = {} as RecaptchaActions;
		let newState: RecaptchaState;

		beforeEach(() => {
			action = new GetRecaptchaStatusSuccess();
			newState = recaptchaReducer(initialState, action);
		});
		it('should return the state', () => {
			expect(newState.recaptcha).toEqual({
				status: EntityStatus.Success
			});
		});
	});

	describe('GetRecaptchaStatusFailure', () => {
		let action: RecaptchaActions = {} as RecaptchaActions;
		let newState: RecaptchaState;
		const error: Error = {
			name: 'testError',
			message: 'errors works fine',
		};
		beforeEach(() => {
			action = new GetRecaptchaStatusFailure(error);
			newState = recaptchaReducer(initialState, action);
		});
		it('should return the error', () => {
			expect(newState.recaptcha).toEqual({
				status: EntityStatus.Error,
				error,
			});
		});
	});

});
