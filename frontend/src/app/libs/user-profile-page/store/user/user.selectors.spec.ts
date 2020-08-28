import { UserState } from './user-state';
import { IUser } from '../../model/user';
import { selectUser, selectUserState } from './user.selectors';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';

describe('Auth Selectors', () => {
	const user: EntityWrapper<IUser> = {
		status: EntityStatus.Success,
		value: {
			firstName: '1',
			secondName: '1',
			mobilePhone: '1',
			password: '1',
			isAdmin: false,
			_id: '0',
			email: 'test@test.test',
		},
	};
	const state: UserState = {
		userData: user,
	};

	describe('selectAuthState', () => {
		it('should return the feature state', () => {
			expect(selectUserState.projector(state)).toEqual(state);
		});
	});

	describe('selectUser', () => {
		it('should return user', () => {
			expect(selectUser.projector(state)).toEqual(user);
		});
	});
});
