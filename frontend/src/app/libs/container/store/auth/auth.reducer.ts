import { Action } from '@ngrx/store';
import { User } from 'src/app/libs/models/user'
import { AuthActionTypes, AuthActions } from './autn.actions';


export const authFeatureKey = 'auth';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer(state = initialState, action: AuthActions): State {
  switch (action.type) {

    case AuthActionTypes.LoginSuccess: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          email: action.payload.email,
        },
        errorMessage: null
      };
    }

    case AuthActionTypes.LoginFailure: {
      return {
        ...state,
        errorMessage: 'Incorrect email and/or password.'
      };
    }

    default:
      return state;
  }
}
