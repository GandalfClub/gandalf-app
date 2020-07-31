import { selectAuthState } from './auth.selectors';
import * as fromAuth from './auth.reducer';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';

describe('Auth Selectors', () => {
	it('should select the feature state', () => {
		const result: AuthState = selectAuthState({
			[fromAuth.authFeatureKey]: {
				user: {
					status: EntityStatus.Init,
				}
			}
		});

		expect(result).toEqual({
			user: {
				status: EntityStatus.Init,
			}
		});
	});
});
