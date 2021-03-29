import { ActionType, EventsAction } from './events.actions';
import { EventsState } from './events-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

export const initialState: EventsState = {
	events: {
		status: EntityStatus.Init,
		value: [],
		error: null,
	},
};

export function eventsReducer(state: EventsState = initialState, action: EventsAction): EventsState {
	switch (action.type) {
		case ActionType.GetEvents: {
			return {
				...state,
				events: {
					status: EntityStatus.Pending,
					error: null,
				},
			};
		}
		case ActionType.GetEventsSuccess: {
			return {
				...state,
				events: {
					value: action.payload,
					status: EntityStatus.Success,
					error: null,
				},
			};
		}
		case ActionType.GetEventsFail: {
			return {
				...state,
				events: {
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}
		default:
			return state;
	}
}
