import {
	RecaptchaActionTypes,
	RecaptchaActions,
	GetRecaptchaStatusSuccess,
	GetRecaptchaStatusFailure
	} from './recaptcha.actions';
import { Recaptcha } from '../../models/recaptcha';
import { RecaptchaState } from '../../models/recaptcha-state';
import { EntityStatus } from '../../../auth/models/entity-status';

export const recaptchaFeatureKey: string = 'recaptcha';

export const initialState: RecaptchaState = {
	recaptcha: {
		status: EntityStatus.Init,
	}
};

export function recaptchaReducer(state: RecaptchaState = initialState, action: RecaptchaActions): RecaptchaState {
	switch (action.type) {
		case RecaptchaActionTypes.GetRecaptchaStatusSuccess: {
			return {
				...state,
				recaptcha: {
					status: EntityStatus.Success
				}
			};
		}
		case RecaptchaActionTypes.GetRecaptchaStatusFailure: {
			return {
				...state,
				recaptcha: {
					status: EntityStatus.Error,
					error: (action as GetRecaptchaStatusFailure).payload,
				}
			};
		}
		default:
			return state;
	}
}
