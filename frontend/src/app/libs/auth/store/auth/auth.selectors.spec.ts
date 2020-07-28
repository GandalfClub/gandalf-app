import { selectAuthState } from './auth.selectors';
import * as fromAuth from './auth.reducer';
import { AuthState } from '../../models/auth-state';

describe('Auth Selectors', () => {
	it('should select the feature state', () => {
		const result: AuthState = selectAuthState({
			[fromAuth.authFeatureKey]: {
				isAuthenticated: false,
				user: null,
				errorMessage: null
			}
		});

		expect(result).toEqual({
			isAuthenticated: false,
			user: null,
			errorMessage: null
		});
	});
});
