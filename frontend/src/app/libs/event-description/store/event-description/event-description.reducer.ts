import { EventDescriptionTypes, EventDescriptionActionTypes } from './event-description.actions';
import { EventDescriptionState } from './event-description-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

export const initialState: EventDescriptionState = {
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	},
};

export function eventDescriptionReducer(state: EventDescriptionState = initialState, action: EventDescriptionTypes): EventDescriptionState {
	switch (action.type) {
		case EventDescriptionActionTypes.LoadEventDescription: {
			return {
				...state,
				event: {
					status: EntityStatus.Pending,
					error: null,
				},
			};
		}
		case EventDescriptionActionTypes.LoadEventDescriptionsSuccess: {
			return {
				...state,
				event: {
					value: {
						event: action.payload.event,
						userLoginStatus: action.payload.userLoginStatus,
					},
					status: EntityStatus.Success,
					error: null,
				},
			};
		}
		case EventDescriptionActionTypes.LoadEventDescriptionsFailure: {
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
