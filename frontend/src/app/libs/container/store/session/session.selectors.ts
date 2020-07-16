import { createFeatureSelector } from '@ngrx/store';
import { ISessionState, sessionFeatureKey } from './session.reducer';
import { IAppState } from '..';

export const selectSessionState: any = createFeatureSelector<IAppState, ISessionState>(sessionFeatureKey);
