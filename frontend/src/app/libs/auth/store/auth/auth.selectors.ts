import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { authFeatureKey } from './auth.reducer';
import { AuthState } from '../../models/auth-state';
import { EntityWrapper } from '../../models/entity-wraper';

export const selectAuthState: MemoizedSelector<{}, AuthState> = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser: MemoizedSelector<AuthState, EntityWrapper<User>> = createSelector(
	selectAuthState,
	(state: AuthState) => state.user
);
