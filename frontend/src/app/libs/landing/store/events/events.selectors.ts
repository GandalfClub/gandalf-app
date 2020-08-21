import { createFeatureSelector, MemoizedSelector, createSelector, DefaultProjectorFn } from '@ngrx/store';
import { eventsFeatureKey } from './events.reducer';
import { EventsState } from '../../models/events-state';
import { Event } from '../../models/event';

export const selectEventsState: MemoizedSelector<{}, EventsState> = createFeatureSelector<EventsState>(eventsFeatureKey);

export const selectEvents: MemoizedSelector<{}, Event[], DefaultProjectorFn<Event[]>> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events
);
