import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState: MemoizedSelector<{}, fromAuth.State> = createFeatureSelector<fromAuth.State>(
	fromAuth.authFeatureKey
);
