import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { AuthState } from '../../models/auth-state'
import { authFeatureKey } from './auth.reducer';

export const selectAuthState: MemoizedSelector<{}, AuthState> = createFeatureSelector<AuthState>(
	authFeatureKey
);

export const selectIsAuthenticated: MemoizedSelector<AuthState, boolean> = createSelector(
	selectAuthState,
	(state: AuthState) => state.isAuthenticated
);

export const selectUser: MemoizedSelector<AuthState, User> = createSelector(
	selectAuthState,
	(state: AuthState) => state.user
);

export const selectErrorMessage: MemoizedSelector<AuthState, string> = createSelector(
	selectAuthState,
	(state: AuthState) => state.errorMessage
);

export const selectIsAdmin: MemoizedSelector<AuthState, boolean> = createSelector(
	selectUser,
	(user: User) => user ? user.isAdmin : null
);
