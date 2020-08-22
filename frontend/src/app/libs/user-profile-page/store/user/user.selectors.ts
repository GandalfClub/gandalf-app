import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { userFeatureKey } from './user.reducer';
import { UserState } from '../../model/userstate';
import { Wrapper } from '../../model/wraper';
import { IUser } from '../../model/user';

export const selectUserState: MemoizedSelector<{}, UserState> = createFeatureSelector<UserState>(userFeatureKey);

export const selectUser: MemoizedSelector<UserState, Wrapper<IUser>> = createSelector(
	selectUserState,
	(state: UserState) => state.userData
);
