import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { recaptchaFeatureKey } from './recaptcha.reducer';
import { Recaptcha } from '../../models/recaptcha';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export const selectRecaptchaState: MemoizedSelector<{}, RecaptchaState> = createFeatureSelector<RecaptchaState>(recaptchaFeatureKey);

export const selectIsRecaptchaPassed: MemoizedSelector<RecaptchaState, EntityWrapper<Recaptcha>> = createSelector(
	selectRecaptchaState,
	(state: RecaptchaState) => state.recaptcha
);
