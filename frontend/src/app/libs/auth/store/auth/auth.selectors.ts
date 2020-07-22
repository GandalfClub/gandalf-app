import { createFeatureSelector, createSelector, MemoizedSelector, Selector, State } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import { User } from '../../models/user';

export const selectAuthState: MemoizedSelector<{}, fromAuth.State> = createFeatureSelector<fromAuth.State>(
	fromAuth.authFeatureKey
);

export const selectIsAuthenticated: MemoizedSelector<fromAuth.State, boolean> = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.isAuthenticated
);

export const selectUser: MemoizedSelector<fromAuth.State, User> = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.user
);

export const selectErrorMessage: MemoizedSelector<fromAuth.State, string> = createSelector(
	selectAuthState,
	(state: fromAuth.State) => state.errorMessage
);

export const selectIsAdmin: MemoizedSelector<fromAuth.State, boolean> = createSelector(
	selectUser,
	(user: User) => user ? user.isAdmin : null
);
