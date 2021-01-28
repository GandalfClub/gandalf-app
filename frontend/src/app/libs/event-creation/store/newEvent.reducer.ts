import { NewEventsActions, NewEventsActionTypes } from './newEvent.actions';
import { NewEvent } from './model/model';
import { EntityWrapper } from './model/entity-wrapper';
import { EntityStatus } from './model/entity-status';

export interface NewEventState {
	title: string;
	event: EntityWrapper<NewEvent>;
}

export const initialState: NewEventState = {
	title: '',
	event: {
		status: EntityStatus.Init,
		value: null,
		error: null,
	}
};

export function newEventReducer(state: NewEventState = initialState, action: NewEventsActions): NewEventState {
	switch (action.type) {

		case NewEventsActionTypes.SetTitleForEvent: {
			return {
				...state,
				title: action.payload as string
			};
		}

		case NewEventsActionTypes.CreateEvent: {
			return {
				...state,
				event: {
					status: EntityStatus.Pending,
					error: null,
				}
			};
		}

		case NewEventsActionTypes.CreateEventSuccess: {
			return {
				...state,
				event: {
					value: action.payload as NewEvent,
					status: EntityStatus.Success,
					error: null,
				}
			};
		}

		case NewEventsActionTypes.CreateEventFail: {
			return {
				...state,
				event: {
					status: EntityStatus.Error,
					error: action.payload as Error,
				}
			};
		}

		default:
			return state;
	}
}
