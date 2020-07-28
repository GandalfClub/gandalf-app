import { AuthActionTypes, AuthActions } from './auth.actions';
import { AuthState } from '../../models/auth-state';

export const authFeatureKey: string = 'auth';

export const initialState: AuthState = {
	isAuthenticated: false,
	user: null,
	errorMessage: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
	switch (action.type) {

		case AuthActionTypes.SignInSuccess: {
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				errorMessage: null
			};
		}

		case AuthActionTypes.SignInFailure: {
			return {
				...state,
				errorMessage: action.payload
			};
		}

		case AuthActionTypes.SignUpSuccess: {
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				errorMessage: null
			};
		}

		case AuthActionTypes.SignUpFailure: {
			return {
				...state,
				errorMessage: action.payload
			};
		}

		default:
			return state;
	}
}
