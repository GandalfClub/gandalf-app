import { UsersActions, LoadUsers, LoadUsersSuccess, LoadUsersFail, ToggleEventManagerRole, ToggleEventManagerRoleSuccess, ToggleEventManagerRoleFail, RemoveUser, RemoveUserSuccess, RemoveUserFail, RemoveSelectedUsers, RemoveSelectedUsersSuccess, RemoveSelectedUsersFail } from './users.actions';
import { usersReducer, initialState } from './users.reducer';
import { UsersState } from './users-state';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { User } from '../../../auth/models/user';
import { UserClaim } from '../../models/user-claims.enum';

describe('Users Reducer', () => {
	let action: UsersActions;
	let result: UsersState;
	let usersError: Error;
	let currentState: UsersState;

	let user: User;
	let updatedUser: User;

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
		updatedUser = {
			...user, claims: [UserClaim.EventManager]
		};
		currentState = {users: {
			...initialState.users,
			value: [user]}
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
			result = usersReducer(currentState, action);
		});

		it('should change status to pending', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Pending,
				value: [user],
				error: null
			});
		});
	});

	describe('ToggleEventManagerRoleSuccess', () => {
		beforeEach(() => {
			action = new ToggleEventManagerRoleSuccess(updatedUser) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return users array with updated user and status success', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Success,
				value: [updatedUser],
				error: null
			});
		});
	});

	describe('ToggleEventManagerRoleFail', () => {
		beforeEach(() => {
			usersError = new Error('error');
			action = new ToggleEventManagerRoleFail(usersError) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return the error', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Error,
				value: [user],
				error: usersError,
			});
		});
	});

	describe('RemoveUser', () => {
		beforeEach(() => {
			action = new RemoveUser(user) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should change status to pending', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Pending,
				value: [user],
				error: null
			});
		});
	});

	describe('RemoveUserSuccess', () => {
		beforeEach(() => {
			action = new RemoveUserSuccess(user) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return users array without removed user and with status success', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Success,
				value: [],
				error: null
			});
		});
	});

	describe('RemoveUserFail', () => {
		beforeEach(() => {
			usersError = new Error('error');
			action = new RemoveUserFail(usersError) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return the error', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Error,
				value: [user],
				error: usersError,
			});
		});
	});

	describe('RemoveSelectedUsers', () => {
		beforeEach(() => {
			action = new RemoveSelectedUsers([user.id]) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should change status to pending', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Pending,
				value: [user],
				error: null
			});
		});
	});

	describe('RemoveSelectedUsersSuccess', () => {
		beforeEach(() => {
			action = new RemoveSelectedUsersSuccess([user.id]) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return users array without removed users and with status success', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Success,
				value: [],
				error: null
			});
		});
	});

	describe('RemoveSelectedUsersFail', () => {
		beforeEach(() => {
			usersError = new Error('error');
			action = new RemoveSelectedUsersFail(usersError) as UsersActions;
			result = usersReducer(currentState, action);
		});

		it('should return the error', () => {
			expect(result.users).toEqual({
				status: EntityStatus.Error,
				value: [user],
				error: usersError,
			});
		});
	});

});
