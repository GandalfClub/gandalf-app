import { EntityStatus } from '../../../auth/models/entity-status';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { async } from '@angular/core/testing';
import { User } from '../../../auth/models/user';
import { UsersState } from './users-state';
import { selectUsers, selectUsersState, selectUsersValue } from './users.selectors';

describe('Events Selectors', () => {
	let userValue: User;
	let users: EntityWrapper<User[]>;
	let state: UsersState;

	beforeEach(async(() => {
		userValue = {
			id: 'test',
			firstName: 'John',
			secondName: 'Connor',
			mobilePhone: 'test',
			isAdmin: false,
			email: 'test@test.by',
			password: 'test',
			claims: [],
		};

		users = {
			status: EntityStatus.Success,
			value: [userValue],
		};

		state = {
			users,
		};
	}));

	describe('selectUsersState', () => {
		it('should return the feature state', () => {
			expect(selectUsersState.projector(state)).toEqual(state);
		});
	});

	describe('selectEvents', () => {
		it('should return users state', () => {
			expect(selectUsers.projector(state)).toEqual(users);
		});
	});

	describe('selectUsersValue', () => {
		it('should return users value', () => {
			expect(selectUsersValue.projector(state)).toEqual(users.value);
		});
	});
});
