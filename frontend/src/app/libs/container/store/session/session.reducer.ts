import { Action, ActionReducer } from '@ngrx/store';
import { IUser } from '../../models/user';
import { ActionType } from './session.actions';
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
		case ActionType.SIGN_IN:
			return {
				...state,
				authenticationError: null,
			};
		case ActionType.SIGNIN_SUCCES:
			return {
				...state,
				user: (action as SigninSucces).payload.user,
				isLogged: (action as SigninSucces).payload.isLogged,
			};
		default:
			return state;
	}
};

export function sessionStateReducer(state: ISessionState | undefined, action: Action): ISessionState {
	return reducer(state, action);
}
