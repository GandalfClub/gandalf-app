import { selectRecaptchaState, selectIsRecaptchaPassed } from './recaptcha.selectors';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityStatus } from '../../models/entity-status';
import { Recaptcha } from '../../models/recaptcha';
import { EntityWrapper } from '../../models/entity-wraper';

describe('Recaptcha Selectors', () => {
	const recaptcha: EntityWrapper<Recaptcha> = {
		status: EntityStatus.Success,
		value: {
			isRecaptchaPassed: true
		},
	};
	const state: RecaptchaState = {
		recaptcha,
	};

	describe('selectRecaptchaState', () => {
		it('should return the feature state', () => {
			expect(selectRecaptchaState.projector(state)).toEqual(state);
		});
	});

	describe('selectIsRecaptchaPassed', () => {
		it('should return isRecaptchaPassed', () => {
			expect(selectIsRecaptchaPassed.projector(state)).toEqual(recaptcha);
		});
	});
});
