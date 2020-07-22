import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState: MemoizedSelector<{}, fromAuth.State> = createFeatureSelector<fromAuth.State>(
	fromAuth.authFeatureKey
);

export const selectIsAuthenticated = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.isAuthenticated
);

export const selectUser = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.user
);

export const selectErrorMessage = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.errorMessage
);

export const selectIsAdmin = createSelector(
	selectUser,
	(user) => user ? user.isAdmin : null
);