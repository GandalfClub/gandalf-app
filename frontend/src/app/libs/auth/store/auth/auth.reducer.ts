import { AuthActionTypes, AuthActions } from './auth.actions';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';

export const authFeatureKey: string = 'auth';

export const initialState: AuthState = {
	user: {
		status: EntityStatus.Init,
	}
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
	switch (action.type) {

		case AuthActionTypes.SignIn: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending,
				}
			};
		}

		case AuthActionTypes.SignInByGithub: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending
				}
			};
		}

		case AuthActionTypes.SignInSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: action.payload,
				}
			};
		}

		case AuthActionTypes.SignInFailure: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					error: action.payload,
				}
			};
		}

		case AuthActionTypes.SignUp: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending
				}
			};
		}

		case AuthActionTypes.SignUpSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: action.payload,
				}
			};
		}

		case AuthActionTypes.SignUpFailure: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					error: action.payload,
				}
			};
		}

		default:
			return state;
	}
}
