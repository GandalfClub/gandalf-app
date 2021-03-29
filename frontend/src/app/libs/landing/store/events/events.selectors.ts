import { createFeatureSelector, MemoizedSelector, createSelector, MemoizedSelectorWithProps } from '@ngrx/store';
import { landingFeatureKey } from '../store.module';
import { EventsState } from './events-state';
import { Event } from '../../models/event';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { EventParticipation } from '../../models/event-participation.class';

export const selectEventsState: MemoizedSelector<{}, EventsState> = createFeatureSelector<EventsState>(landingFeatureKey);

export const selectEvents: MemoizedSelector<{}, EntityWrapper<Event[]>> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events
);

export const selectEventsValue: MemoizedSelector<{}, Event[]> = createSelector(
	selectEventsState,
	(state: EventsState) => state.events?.value
);

export const selectEventsBelongedToUser: MemoizedSelectorWithProps<{}, User, Event[]> = createSelector(
	selectEventsValue,
	(events: Event[], user: User) => events?.filter((event: Event) => {
		const participation: EventParticipation = event.eventParticipations.find((ev: EventParticipation) => ev.userId === user.id);
		return Boolean(participation);
	})
);
