import { EventTypes, EventActionTypes } from './event-description.actions';
import { EventDescriptionState } from './event-description-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

export const initialState: EventDescriptionState = {
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	},
};

export function eventReducer(state: EventDescriptionState = initialState, action: EventTypes): EventDescriptionState {
	switch (action.type) {
		case EventActionTypes.LoadEvent: {
			return {
				...state,
				event: {
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
		case EventActionTypes.LoadEventFail: {
			return {
				...state,
				event: {
					status: EntityStatus.Error,
					error: action.payload,
				},
			};
		}
		default:
			return state;
	}
}
