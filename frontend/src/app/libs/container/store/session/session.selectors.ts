import { createSelector, createFeatureSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { ISessionState, sessionFeatureKey } from './session.reducer';
import { IUser } from 'src/app/libs/container/models/user';
import { IAppState } from '..';

export const selectSessionState: any = createFeatureSelector<IAppState, ISessionState>(sessionFeatureKey);

export const selectUser: MemoizedSelector<ISessionState, IUser, DefaultProjectorFn<IUser>> = createSelector(
	selectSessionState,
	(state: ISessionState) => state.user
);

export const selectIsUserLogged: MemoizedSelector<ISessionState, boolean, DefaultProjectorFn<boolean>> = createSelector(
	selectSessionState,
	(session: ISessionState) => session.isLogged
);
