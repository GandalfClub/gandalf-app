import {
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionType,
	UserActionTypes,
} from './user.actions';
import { UserState } from './user-state';
import { EntityStatus } from '../../../auth/models/entity-status';

export const userProfileFeatureKey: string = 'user';

export const initialState: UserState = {
	userData: {
		status: EntityStatus.Init,
	},
};

export function userReducer(state: UserState = initialState, action: UserActionType): UserState {
	switch (action.type) {
		case UserActionTypes.GetUserFromAuth: {
			return {
				...state,
				userData: {
					status: EntityStatus.Success,
				},
			};
		}
		case UserActionTypes.GetUserFromAuthSuccess: {
			return {
				...state,
				userData: {
					status: EntityStatus.Success,
					value: (action as GetUserFromAuthSuccessfullyAction).payload.user,
				},
			};
		}
		case UserActionTypes.GetUserFromAuthFail: {
			return {
				...state,
				userData: {
					status: EntityStatus.Error,
					value: null,
					error: (action as GetUserFromAuthFailedAction).payload,
				},
			};
		}
		case UserActionTypes.UpdateUser: {
			return {
				...state,
				userData: {
					status: EntityStatus.Success,
					value: (action as UpdateUserAction).payload.user,
				},
			};
		}
		case UserActionTypes.UpdateUserInfoSuccessfuly: {
			return {
				...state,
				userData: {
					status: EntityStatus.Success,
					value: (action as UpdateUserInfoSuccessfulyAction).payload.user,
				},
			};
		}
		case UserActionTypes.UpdateUserInfoFailed: {
			return {
				...state,
				userData: {
					status: EntityStatus.Error,
					value: null,
					error: (action as UpdateUserInfoFailedAction).payload,
				},
			};
		}
		default:
			return state;
	}
}
