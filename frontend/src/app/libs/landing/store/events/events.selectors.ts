import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { eventsFeatureKey } from './events.reducer';
import { EventsState } from './events-state';
import { Event } from '../../models/event';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';

export const selectEventsState: MemoizedSelector<{}, EventsState> = createFeatureSelector<EventsState>(eventsFeatureKey);

export const selectEvents: MemoizedSelector<{}, EntityWrapper<Event[]>> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events
);
