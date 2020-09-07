import { createFeatureSelector, createSelector, MemoizedSelector, State } from '@ngrx/store';
import { UsersState } from './users-state';
import { adminRoleManagementFeatureKey } from '../store.module';
import { User } from '../../models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

export const selectUsersState: MemoizedSelector<{}, UsersState> = createFeatureSelector<UsersState>(adminRoleManagementFeatureKey);

export const selectUsers: MemoizedSelector<{}, EntityWrapper<User[]>> = createSelector(
	selectUsersState,
	(state: UsersState) => state.users
);

export const selectUsersValue: MemoizedSelector<{}, User[]> = createSelector(selectUsersState, (state: UsersState) => state.users.value);
