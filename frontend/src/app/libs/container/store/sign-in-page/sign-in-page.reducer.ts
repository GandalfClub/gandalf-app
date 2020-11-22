
import { HideHeaderAndFooter, SignInPageActionTypes } from './sign-in-page.actions';

export const signInPageFeatureKey: string = 'signInPage';

export interface SignInState {
	hideHeader: boolean;
	hideFooter: boolean;
}

export const initialState: SignInState = {
	hideHeader: false,
	hideFooter: false
};

export function reducerSignIn(state: SignInState = initialState, action: HideHeaderAndFooter): SignInState {
	switch (action.type) {

		case SignInPageActionTypes.HideHeaderAndFooter:
			return {
				...state,
				hideHeader: true,
				hideFooter: true
			};

		default:
			return state;
	}
}
