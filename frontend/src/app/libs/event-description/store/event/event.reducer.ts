import { EventActions, EventActionTypes } from './event.actions';
import { EventState } from './event-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { Event } from 'src/app/libs/landing/models/event';

export const initialState: EventState = {
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	},
};

export function eventReducer(state: EventState = initialState, action: EventActions): EventState {
	switch (action.type) {
		case EventActionTypes.LoadEvent:
		case EventActionTypes.RegForEvent: {
			return {
				...state,
				event: {
					...state.event,
					status: EntityStatus.Pending,
					error: null,
				},
			};
		}
		case EventActionTypes.LoadEventSuccess: {
			return {
				...state,
				event: {
					value: action.payload,
					status: EntityStatus.Success,
					error: null,
				},
			};
		}
		case EventActionTypes.LoadEventFail:
		case EventActionTypes.RegForEventFail: {
			return {
				...state,
				event: {
					...state.event,
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}

		case EventActionTypes.RegForEventSuccess: {
			const value: Event = { ...state.event.value };
			value.eventParticipations = state.event.value.eventParticipations.slice();
			value.eventParticipations.push(action.payload);

			return {
				...state,
				event: {
					value,
					status: EntityStatus.Success,
					error: null,
				},
			};
		}
		default:
			return state;
	}
}
