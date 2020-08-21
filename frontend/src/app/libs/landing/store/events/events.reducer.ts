import { ActionType, EventsAction } from './events.actions';
import { EventsState } from '../../models/events-state';

export const eventsFeatureKey: string = 'events';

export const initialState: EventsState = {
	events: null,
	loadingEvents: false,
	getEventsError: null,
};

export function eventsReducer(state: EventsState = initialState, action: EventsAction): EventsState {
	switch (action.type) {
		case ActionType.GetEvents: {
			return {
				...state,
				loadingEvents: true,
				getEventsError: null,
			};
		}
		case ActionType.GetEventsSuccessfuly: {
			return {
				...state,
				events: action.payload,
				loadingEvents: false,
				getEventsError: null,
			};
		}
		case ActionType.GetEventsFailed: {
			return {
				...state,
				loadingEvents: false,
				getEventsError: action.payload,
			};
		}
		default:
			return state;
	}
}
