import {
	AuthActionTypes,
	AuthActions,
	UpdateUserInfo,
	UpdateUserInfoSuccess,
	UpdateUserInfoFail,
	SignUpSuccess,
	SignInSuccess,
	LoadUserSuccess,
	LoadUserFail,
	SignInFailure,
	SignUpFailure
} from './auth.actions';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';

export const authFeatureKey: string = 'auth';

export const initialState: AuthState = {
	user: {
		status: EntityStatus.Init,
	},
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
	switch (action.type) {
		case AuthActionTypes.SignIn: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending,
				},
			};
		}
		case AuthActionTypes.SignInByGithub: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending,
				},
			};
		}
		case AuthActionTypes.SignInSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as SignInSuccess).payload,
				},
			};
		}
		case AuthActionTypes.SignInFailure: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					error: (action as SignInFailure).payload,
				},
			};
		}
		case AuthActionTypes.SignUp: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending,
				},
			};
		}
		case AuthActionTypes.SignUpSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as SignUpSuccess).payload,
				},
			};
		}
		case AuthActionTypes.SignUpFailure: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					error: (action as SignUpFailure).payload,
				},
			};
		}
		case AuthActionTypes.UpdateUserInfo: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as UpdateUserInfo).payload.user,
				},
			};
		}
		case AuthActionTypes.UpdateUserInfoSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as UpdateUserInfoSuccess).payload.user,
				},
			};
		}
		case AuthActionTypes.UpdateUserInfoFail: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					value: null,
					error: (action as UpdateUserInfoFail).payload,
				},
			};
		}
		case AuthActionTypes.LoadUser: {
			return {
				...state,
				user: {
					status: EntityStatus.Pending,
				},
			};
		}
		case AuthActionTypes.LoadUserSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as LoadUserSuccess).payload.user,
				},
			};
		}
		case AuthActionTypes.LoadUserFail: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					value: null,
					error: (action as LoadUserFail).payload
				},
			};
		}
		default:
			return state;
	}
}
