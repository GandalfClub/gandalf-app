import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromContainer from './container.reducer';

 export const selectContainerState: MemoizedSelector<{}, fromContainer.State> = createFeatureSelector<fromContainer.State>(
 	fromContainer.containerFeatureKey
 );

export const selectHideHeader: MemoizedSelector<{}, boolean>
	= createSelector(selectContainerState, (state: fromContainer.State) => state.hideHeader);

export const selectHideFooter: MemoizedSelector<{}, boolean>
	= createSelector(selectContainerState, (state: fromContainer.State) => state.hideFooter);
