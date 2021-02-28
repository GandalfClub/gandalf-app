import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { EventsCreationState } from './event.reducer';
import { newEventFeatureKey } from './store.module';
import { ITask } from '../../common-components/components/tasks-creator/models/task';

export const selectNewEvent: MemoizedSelector<{}, EventsCreationState> = createFeatureSelector<EventsCreationState>(newEventFeatureKey);

export const selectTitleForGeneralEvent: MemoizedSelector<{}, string> = createSelector(selectNewEvent,
	(state: EventsCreationState) => state.general.title);

export const selectTasksEvent: MemoizedSelector<{}, Set<ITask>> = createSelector(selectNewEvent,
  (state: EventsCreationState) => state.tasks);
