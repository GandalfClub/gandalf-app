import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import * as fromSample from './sample.reducer';

export const selectSampleState: MemoizedSelector<{}, fromSample.State> = createFeatureSelector<fromSample.State>(
	fromSample.sampleFeatureKey
);
