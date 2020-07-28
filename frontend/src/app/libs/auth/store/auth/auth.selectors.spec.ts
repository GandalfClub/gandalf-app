import { selectAuthState } from './auth.selectors';
import * as fromAuth from './auth.reducer';
import { EntityWrapper, EntityStatus } from '../../models/entity-wraper';
import { User } from '../../models/user';

describe('Auth Selectors', () => {
	it('should select the feature state', () => {
		const result: EntityWrapper<User> = selectAuthState({
			[fromAuth.authFeatureKey]: {
				status: EntityStatus.Init,
			}
		});

		expect(result).toEqual({
			isAuthenticated: false,
			user: null,
			errorMessage: null
		});
	});
});
