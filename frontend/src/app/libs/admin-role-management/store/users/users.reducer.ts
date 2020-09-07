import { UsersActionType, UsersActions } from './users.actions';
import { UsersState } from './users-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

export const initialState: UsersState = {
	users: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	},
};

export function usersReducer(state: UsersState = initialState, action: UsersActions): UsersState {
	switch (action.type) {
		case UsersActionType.LoadUsers: {
			return {
				...state,
				users: {
					status: EntityStatus.Pending,
					error: null,
				},
			};
		}
		case UsersActionType.LoadUsersSuccess: {
			return {
				...state,
				users: {
					value: action.payload,
					status: EntityStatus.Success,
					error: null,
				},
			};
		}
		case UsersActionType.LoadUsersFail: {
			return {
				...state,
				users: {
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}
		default:
			return state;
	}
}
