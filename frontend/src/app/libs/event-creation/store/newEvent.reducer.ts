import { NewEventAction, NewEventActionTypes } from './newEvent.actions';

export interface NewEventState {
	title: string;
}

export const initialState: NewEventState = {
	title: ''
};

export function newEventReducer(state: NewEventState = initialState, action: NewEventAction): NewEventState {
	
	switch (action.type) {

		case NewEventActionTypes.SetTitleForEvent: {
			return {
				...state,
				title: action.payload
			};
		}

		default:
			return state;
	}
}
