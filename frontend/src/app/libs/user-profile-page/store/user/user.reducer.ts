import {
	GetUserFromAuthAction,
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionType,
	UserActionTypes,
} from './user.actions';
import { UserState } from '../../model/userstate';

export const userFeatureKey: string = 'user';

export const initialState: UserState = {
	userData: {
		status: false,
	},
};

export function userReducer(state: UserState = initialState, action: UserActionType): UserState {
	switch (action.type) {
		case UserActionTypes.GetUserFromAuth: {
			return {
				...state,
				userData: {
					status: true,
				},
			};
		}

		case UserActionTypes.GetUserFromAuthSuccessfuly: {
			return {
				...state,
				userData: {
					status: true,
					value: (action as GetUserFromAuthSuccessfullyAction).payload.user,
				},
			};
		}

		case UserActionTypes.GetUserFromAuthFailed: {
			return {
				...state,
				userData: {
					status: false,
					value: null,
					error: (action as GetUserFromAuthFailedAction).payload,
				},
			};
		}

		case UserActionTypes.UpdateUser: {
			return {
				...state,
				userData: {
					status: true,
					value: (action as UpdateUserAction).payload.user,
				},
			};
		}

		case UserActionTypes.UpdateUserInfoSuccessfuly: {
			return {
				...state,
				userData: {
					status: true,
					value: (action as UpdateUserInfoSuccessfulyAction).payload.user,
				},
			};
		}

		case UserActionTypes.UpdateUserInfoFailed: {
			return {
				...state,
				userData: {
					status: false,
					value: null,
					error: (action as UpdateUserInfoFailedAction).payload,
				},
			};
		}

		default:
			return state;
	}
}
