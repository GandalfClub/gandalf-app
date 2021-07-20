import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { EventsCreationState } from './event.reducer';
import { newEventFeatureKey } from './store.module';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { Event } from '../../landing/models/event';
import { EntityStatus } from './model/entity-status';

export const selectNewEvent: MemoizedSelector<{}, EventsCreationState> = createFeatureSelector<EventsCreationState>(newEventFeatureKey);

export const selectTitleForGeneralEvent: MemoizedSelector<{}, string> = createSelector(selectNewEvent,
  (state: EventsCreationState) => state.event.value?.generalInfo?.title);

export const selectEvent: MemoizedSelector<{}, Event> = createSelector(selectNewEvent,
  (state: EventsCreationState) => state.event.value);

export const getLoadingEventStatus: MemoizedSelector<{}, boolean> = createSelector(selectNewEvent,
  (state: EventsCreationState) => state.event.status === EntityStatus.Pending);

export const selectTasksEvent: MemoizedSelector<{}, Map<Symbol, Task>> = createSelector(selectNewEvent,
  (state: EventsCreationState) => state.tasks.value);
