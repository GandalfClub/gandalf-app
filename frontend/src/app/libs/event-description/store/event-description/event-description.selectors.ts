import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { eventFeatureKey } from '../store.module';
import { EventDescriptionState } from './event-description-state';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { Event } from '../../../landing/models/event';
import { selectEventsState } from 'src/app/libs/landing/store/events/events.selectors';

export const selectEventState: MemoizedSelector<{}, EventDescriptionState> = createFeatureSelector<EventDescriptionState>(eventFeatureKey);

export const selectEvent: MemoizedSelector<{}, EntityWrapper<Event>> = createSelector(
	selectEventState,
	(state: EventDescriptionState) => state.event
);

export const selectEventValue: MemoizedSelector<{}, Event> = createSelector(
	selectEventState,
	(state: EventDescriptionState) => state.event.value
);
