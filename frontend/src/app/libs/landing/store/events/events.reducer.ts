import { ActionType, EventsAction } from './events.actions';
import { EventsState } from '../../models/events-state';

export const eventsFeatureKey: string = 'events';

export const initialState: EventsState = {
	events: {
		value: null,
		loadingEvents: false,
		error: null,
	},
};

export function eventsReducer(state: EventsState = initialState, action: EventsAction): EventsState {
	switch (action.type) {
		case ActionType.GetEvents: {
			return {
				...state,
				events: {
					loadingEvents: true,
					error: null,
				},
			};
		}
		case ActionType.GetEventsSuccessfuly: {
			return {
				...state,
				events: {
					value: action.payload,
					loadingEvents: false,
					error: null,
				},
			};
		}
		case ActionType.GetEventsFailed: {
			return {
				...state,
				events: {
					loadingEvents: false,
					error: action.payload,
				},
			};
		}
		default:
			return state;
	}
}
