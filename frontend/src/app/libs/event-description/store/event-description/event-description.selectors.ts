import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { eventDescriptionFeatureKey } from '../store.module';
import { EventDescriptionState } from './event-description-state';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EventDescription } from '../../models/event-description';

export const selectEventDescriptionState: MemoizedSelector<{}, EventDescriptionState> = createFeatureSelector<EventDescriptionState>(
	eventDescriptionFeatureKey
);

export const selectEventDescription: MemoizedSelector<{}, EntityWrapper<EventDescription>> = createSelector(
	selectEventDescriptionState,
	(state: EventDescriptionState) => state.event
);

export const selectEventDescriptionValue: MemoizedSelector<{}, EventDescription> = createSelector(
	selectEventDescriptionState,
	(state: EventDescriptionState) => state.event.value
);
