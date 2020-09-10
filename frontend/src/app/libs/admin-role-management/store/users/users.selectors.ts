import { createFeatureSelector, createSelector, MemoizedSelector, State } from '@ngrx/store';
import { UsersState } from './users-state';
import { adminRoleManagementFeatureKey } from '../store.module';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';

export const selectUsersState: MemoizedSelector<{}, UsersState> = createFeatureSelector<UsersState>(adminRoleManagementFeatureKey);

export const selectUsers: MemoizedSelector<{}, EntityWrapper<User[]>> = createSelector(
	selectUsersState,
	(state: UsersState) => state.users
);

export const selectUser: MemoizedSelector<{}, EntityWrapper<User>> = createSelector(selectUsersState, (state: UsersState) => state.user);

export const selectUsersValue: MemoizedSelector<{}, User[]> = createSelector(selectUsersState, (state: UsersState) => state.users.value);
