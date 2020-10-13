import { UsersActionType, UsersActions } from './users.actions';
import { UsersState } from './users-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { User } from 'src/app/libs/auth/models/user';

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
		case UsersActionType.ToggleEventManagerRole: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Pending,
					value:
					Boolean(state.users.value) ?
						[
							...state.users.value.filter((user: User) => user.id !== action.payload.id),
							action.payload
						] :
						[
							action.payload
						]
				},
			};
		}
		case UsersActionType.ToggleEventManagerRoleSuccess: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Success,
				},
			};
		}
		case UsersActionType.ToggleEventManagerRoleFail: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}

		default:
			return state;
	}
}
