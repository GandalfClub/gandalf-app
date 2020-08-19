import { selectAuthState, selectUser } from './auth.selectors';
import * as fromAuth from './auth.reducer';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';
import { User } from '../../models/user';
import { EntityWrapper } from '../../models/entity-wraper';

describe('Auth Selectors', () => {
	describe('selectAuthState', () => {
		const user: EntityWrapper<User> = {
			status: EntityStatus.Init,
		};
		const state: AuthState = {
			user,
		};

		it('should return the feature state', () => {
			expect(selectAuthState.projector(state)).toEqual(state);
		});
	});

	describe('selectUser', () => {

		const user: EntityWrapper<User> = {
			status: EntityStatus.Success,
			value: {
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			},
		};
		const state: AuthState = {
			user,
		};

		it('should return user', () => {
			expect(selectUser.projector(state)).toEqual(user);
		});
	});
});
