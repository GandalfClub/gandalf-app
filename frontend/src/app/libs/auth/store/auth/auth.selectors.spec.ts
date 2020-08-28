import { selectAuthState, selectUser } from './auth.selectors';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';
import { User } from '../../models/user';
import { EntityWrapper } from '../../models/entity-wraper';

describe('Auth Selectors', () => {
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

	describe('selectAuthState', () => {
		it('should return the feature state', () => {
			expect(selectAuthState.projector(state)).toEqual(state);
		});
	});

	describe('selectUser', () => {
		it('should return user', () => {
			expect(selectUser.projector(state)).toEqual(user);
		});
	});
});
