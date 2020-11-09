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
					error: null
				},
			};
		}
		case UsersActionType.ToggleEventManagerRoleSuccess: {
			return {
				...state,
				users: {
					...state.users,
					value:
						[
							// ...state.users.value.filter((user: User) => user.id !== action.payload.id),
							...state.users.value.map((user: User) => {
								if (user.id === action.payload.id) {
									user = action.payload;
								}
								return user;
							}),
						],
					status: EntityStatus.Success,
					error: null
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

		case UsersActionType.RemoveUser: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Pending,
					error: null
				},
			};
		}
		case UsersActionType.RemoveUserSuccess: {
			return {
				...state,
				users: {
					...state.users,
					value:
						[
							...state.users.value.filter((user: User) => user.id !== action.payload.id),
						],
					status: EntityStatus.Success,
					error: null
				},
			};
		}
		case UsersActionType.RemoveUserFail: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}

		case UsersActionType.RemoveSelectedUsers: {
			return {
				...state,
				users: {
					...state.users,
					status: EntityStatus.Pending,
					error: null
				},
			};
		}
		case UsersActionType.RemoveSelectedUsersSuccess: {
			return {
				...state,
				users: {
					...state.users,
					value:
						[
							...state.users.value.filter((user: User) => !action.payload.includes(user.id))
						],
					status: EntityStatus.Success,
					error: null
				},
			};
		}
		case UsersActionType.RemoveSelectedUsersFail: {
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
