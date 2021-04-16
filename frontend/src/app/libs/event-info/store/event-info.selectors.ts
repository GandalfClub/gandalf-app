import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Task } from '../../landing/models/task.model';
import { EventInfoState } from './event-info.reducer';
import { eventInfoFeatureKey } from './store.module';

const selectFeatureState: MemoizedSelector<{}, EventInfoState> = createFeatureSelector<EventInfoState>(eventInfoFeatureKey);

export const getSelectedTask: MemoizedSelector<{}, Task> = createSelector(
	selectFeatureState,
	(state: EventInfoState) => state.selectedTask
);

export const getTasks: MemoizedSelector<{}, Task[]> = createSelector(
	selectFeatureState,
	(state: EventInfoState) => state.tasks.value
);
