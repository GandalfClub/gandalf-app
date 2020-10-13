import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { UsersState } from './users-state';
import { adminRoleManagementFeatureKey } from '../store.module';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';

export const selectUsersState: MemoizedSelector<{}, UsersState> = createFeatureSelector<UsersState>(
	adminRoleManagementFeatureKey
);

export const selectUsers: MemoizedSelector<{}, EntityWrapper<User[]>> = createSelector(
	selectUsersState,
	(state: UsersState) => state.users
);

export const selectUsersValue: MemoizedSelector<{}, User[]> = createSelector(
	selectUsersState,
	(state: UsersState) => state.users.value
);
