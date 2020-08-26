import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { landingFeatureKey } from '../store.module';
import { EventsState } from './events-state';
import { Event } from '../../models/event';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

export const selectEventsState: MemoizedSelector<{}, EventsState> = createFeatureSelector<EventsState>(landingFeatureKey);

export const selectEvents: MemoizedSelector<{}, EntityWrapper<Event[]>> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events
);

export const selectEventsValue: MemoizedSelector<{}, Event[]> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events.value
);
