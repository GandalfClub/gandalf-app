import { AuthActionTypes, AuthActions } from './auth.actions';
import { EntityWrapper, EntityStatus } from '../../models/entity-wraper';
import { User } from '../../models/user';

export const authFeatureKey: string = 'auth';

export const initialState: EntityWrapper<User> = {
    status: EntityStatus.Init,
};

export function authReducer(state: EntityWrapper<User>  = initialState, action: AuthActions): EntityWrapper<User>  {
	switch (action.type) {

		case AuthActionTypes.SignIn: {
			return {
				...state,
				status: EntityStatus.Pending,
			};
		}

		case AuthActionTypes.SignInByGithub: {
			return {
				...state,
				status: EntityStatus.Pending,
			};
		}

		case AuthActionTypes.SignInSuccess: {
			return {
				...state,
				status: EntityStatus.Success,
				value: action.payload,
			};
		}

		case AuthActionTypes.SignInFailure: {
			return {
				...state,
				status: EntityStatus.Error,
			};
		}

		case AuthActionTypes.SignUp: {
			return {
				...state,
				status: EntityStatus.Pending,
			};
		}

		case AuthActionTypes.SignUpSuccess: {
			return {
				...state,
				status: EntityStatus.Success,
				value: action.payload,
			};
		}

		case AuthActionTypes.SignUpFailure: {
			return {
				...state,
				status: EntityStatus.Error,
			};
		}

		default:
			return state;
	}
}
