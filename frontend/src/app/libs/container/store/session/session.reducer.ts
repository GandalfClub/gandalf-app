import { Action, ActionReducer } from '@ngrx/store';
import { IUser } from '../../models/user';
import { ActionType, Signin } from './session.actions';
import { SessionActionTypes, SigninSucces } from './session.actions';

export interface ISessionState {
	user: IUser;
	isLogged: boolean;
}

export const sessionFeatureKey: 'session' = 'session';

const initialState: ISessionState = {
	user: null,
	isLogged: false,
};

export const reducer: ActionReducer<ISessionState | undefined, Action> = (
	state: ISessionState = initialState,
	action: SessionActionTypes
) => {
	switch (action.type) {
		case ActionType.Signin:
			return {
				...state,
				user: (action as Signin).payload,
			};
		case ActionType.SigninSucces:
			return {
				...state,
				user: (action as SigninSucces).payload,
			};
		case ActionType.SigninFailure:
			return {
				...state,
			};
		default:
			return state;
	}
};

export function sessionStateReducer(state: ISessionState | undefined, action: Action): ISessionState {
	return reducer(state, action);
}
