import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { eventFeatureKey } from '../store.module';
import { EventState } from './event-state';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { Event } from '../../../landing/models/event';

export const selectEventState: MemoizedSelector<{}, EventState> = createFeatureSelector<EventState>(eventFeatureKey);

export const selectEvent: MemoizedSelector<{}, EntityWrapper<Event>> = createSelector(selectEventState, (state: EventState) => state.event);

export const selectEventValue: MemoizedSelector<{}, Event> = createSelector(selectEventState, (state: EventState) => state.event.value);
