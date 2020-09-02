import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { userProfileFeatureKey } from './user.reducer';
import { UserState } from './user-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { User } from '../../../auth/models/user';

export const selectUserState: MemoizedSelector<{}, UserState> = createFeatureSelector<UserState>(userProfileFeatureKey);

export const selectUser: MemoizedSelector<UserState, EntityWrapper<User>> = createSelector(
	selectUserState,
	(state: UserState) => state.user
);
