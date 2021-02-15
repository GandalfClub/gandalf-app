import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { NewEventState } from './newEvent.reducer';
import { newEventFeatureKey } from './store.module';

export const selectNewEvent: MemoizedSelector<{}, NewEventState> = createFeatureSelector<NewEventState>(newEventFeatureKey);

export const selectTitleForNewEvent: MemoizedSelector<{}, string> = createSelector(selectNewEvent,
	(state: NewEventState) => state.title);
