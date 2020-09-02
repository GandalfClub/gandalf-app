import {
	GetUserFromAuthFailAction,
	GetUserFromAuthSuccessAction,
	UpdateUserAction,
	UpdateUserInfoFailAction,
	UpdateUserInfoSuccessAction,
	UserActionType,
	UserActionTypes,
} from './user.actions';
import { UserState } from './user-state';
import { EntityStatus } from '../../../auth/models/entity-status';

export const userProfileFeatureKey: string = 'user';

export const initialState: UserState = {
	user: {
		status: EntityStatus.Init,
	},
};

export function userReducer(state: UserState = initialState, action: UserActionType): UserState {
	switch (action.type) {
		case UserActionTypes.GetUserFromAuth: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
				},
			};
		}
		case UserActionTypes.GetUserFromAuthSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as GetUserFromAuthSuccessAction).payload.user,
				},
			};
		}
		case UserActionTypes.GetUserFromAuthFail: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					value: null,
					error: (action as GetUserFromAuthFailAction).payload,
				},
			};
		}
		case UserActionTypes.UpdateUser: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as UpdateUserAction).payload.user,
				},
			};
		}
		case UserActionTypes.UpdateUserInfoSuccess: {
			return {
				...state,
				user: {
					status: EntityStatus.Success,
					value: (action as UpdateUserInfoSuccessAction).payload.user,
				},
			};
		}
		case UserActionTypes.UpdateUserInfoFail: {
			return {
				...state,
				user: {
					status: EntityStatus.Error,
					value: null,
					error: (action as UpdateUserInfoFailAction).payload,
				},
			};
		}
		default:
			return state;
	}
}
