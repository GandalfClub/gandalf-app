import { ActionReducerMap } from '@ngrx/store';
import { ISessionState, sessionStateReducer, sessionFeatureKey } from './session';

export * from '../models/user';
export * from './session';

export interface IAppState {
	[sessionFeatureKey]: ISessionState;
}

export const reducers: ActionReducerMap<IAppState> = {
	[sessionFeatureKey]: sessionStateReducer,
};
