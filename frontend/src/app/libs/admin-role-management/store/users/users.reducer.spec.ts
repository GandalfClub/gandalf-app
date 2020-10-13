import { UsersActions, LoadUsers, LoadUsersSuccess, LoadUsersFail, ToggleEventManagerRole } from './users.actions';
import { usersReducer, initialState } from './users.reducer';
import { UsersState } from './users-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { User } from '../../../auth/models/user';

describe('Users Reducer', () => {
	let action: UsersActions;
	let result: UsersState;
	let usersError: Error;

	let user: User;

	beforeEach(() => {
		user = {
			firstName: 'test',
			secondName: 'test',
			mobilePhone: 'test',
			id: 'test',
			isAdmin: false,
			email: 'test@test.by',
			password: 'test',
			claims: [],
		};
	});

	describe('Init', () => {
		beforeEach(() => {
			action = {} as UsersActions;
			result = usersReducer(initialState, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('Init with default state value', () => {
		beforeEach(() => {
			action = {} as UsersActions;
			result = usersReducer(undefined, action);
		});

		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('LoadUsers', () => {
		beforeEach(() => {
			action = new LoadUsers() as UsersActions;
			result = usersReducer(initialState, action);
		});

		it('should return the users.status - Pending', () => {
			expect(result.users.status).toBe(EntityStatus.Pending);
		});
	});

	describe('LoadUsersSuccess', () => {
		beforeEach(() => {
			action = new LoadUsersSuccess([user]) as UsersActions;
			result = usersReducer(initialState, action);
		});

		it('should return the users', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Success,
				value: [user],
				error: null,
			});
		});
	});

	describe('LoadUsersFail', () => {
		beforeEach(() => {
			usersError = new Error('error');
			action = new LoadUsersFail(usersError) as UsersActions;
			result = usersReducer(initialState, action);
		});

		it('should return the error', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Error,
				error: usersError,
			});
		});
	});
	describe('ToggleEventManagerRole', () => {
		beforeEach(() => {
			action = new ToggleEventManagerRole(user) as UsersActions;
			result = usersReducer(initialState, action);
		});

		it('should return the users', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Pending,
				value: [user],
				error: null
			});
		});
	});
});
