import { selectRecaptchaState, selectIsRecaptchaPassed } from './recaptcha.selectors';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { Recaptcha } from '../../models/recaptcha';

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
