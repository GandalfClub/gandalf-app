import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { User } from '../../models/user';
import { authFeatureKey } from './auth.reducer';
import { EntityWrapper } from '../../models/entity-wraper';

export const selectAuthState: MemoizedSelector<{}, EntityWrapper<User>> = createFeatureSelector<EntityWrapper<User>>(
	authFeatureKey
);

export const selectUser: MemoizedSelector<EntityWrapper<User>, User> = createSelector(
	selectAuthState,
	(state: EntityWrapper<User>) => state.value
);

export const selectStatus: MemoizedSelector<EntityWrapper<User>, string> = createSelector(
	selectAuthState,
	(state: EntityWrapper<User>) => state.status
);
