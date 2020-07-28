import { User } from '../../models/user';
import { AuthActionTypes, AuthActions } from './autn.actions';

export const authFeatureKey: string = 'auth';

export interface State {
	isAuthenticated: boolean;
	user: User | null;
	errorMessage: string | null;
}

export const initialState: State = {
	isAuthenticated: false,
	user: null,
	errorMessage: null
};

export function authReducer(state: State = initialState, action: AuthActions): State {
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
			return{
				...state,
				isAuthenticated: true,
				user: action.payload,
				errorMessage: null
			};
		}

		case AuthActionTypes.SignUpFailure: {
			return{
				...state,
				errorMessage: action.payload
			};
		}

		default:
			return state;
	}
}
