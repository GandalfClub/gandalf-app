import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { authFeatureKey } from './auth.reducer';
import { AuthState } from '../../models/auth-state';

export const selectAuthState: MemoizedSelector<{}, AuthState> = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser: MemoizedSelector<AuthState, User> = createSelector(selectAuthState, (state: AuthState) => state.user.value);

export const selectStatus: MemoizedSelector<AuthState, string> = createSelector(selectAuthState, (state: AuthState) => state.user.status);

export const selectError: MemoizedSelector<AuthState, string> = createSelector(selectAuthState, (state: AuthState) => state.user.error);
