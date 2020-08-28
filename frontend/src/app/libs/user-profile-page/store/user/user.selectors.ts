import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { userFeatureKey } from './user.reducer';
import { UserState } from './user-state';
import { IUser } from '../../model/user';
import { EntityWrapper } from '../../../auth/models/entity-wraper';

export const selectUserState: MemoizedSelector<{}, UserState> = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser: MemoizedSelector<UserState, EntityWrapper<IUser>> = createSelector(
	selectUserState,
	(state: UserState) => state.userData
);
