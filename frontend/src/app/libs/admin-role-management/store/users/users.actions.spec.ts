import { User } from '../../../auth/models/user';
import * as UsersActions from './users.actions';

describe('EventConverterService', () => {
	let action: UsersActions.LoadUsers |
	UsersActions.LoadUsersFail |
	UsersActions.LoadUsersSuccess |
	UsersActions.ToggleEventManagerRole |
	UsersActions.ToggleEventManagerRoleSuccess |
	UsersActions.ToggleEventManagerRoleFail |
	UsersActions.RemoveUser |
	UsersActions.RemoveUserSuccess |
	UsersActions.RemoveUserFail |
	UsersActions.RemoveSelectedUsers |
	UsersActions.RemoveSelectedUsersSuccess |
	UsersActions.RemoveSelectedUsersFail;

	const user: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	describe('LoadUsers', () => {
		beforeEach(() => {
			action = new UsersActions.LoadUsers();
		});
		it('should create LoadEvent action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.LoadUsers,
			});
		});
	});

	describe('LoadUsersSuccess', () => {
		const payload: User[] = [
			user
		];
		beforeEach(() => {
			action = new UsersActions.LoadUsersSuccess(payload);
		});

		it('should create LoadUsersSuccess action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.LoadUsersSuccess,
				payload,
			});
		});
	});

	describe('LoadUsersFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'get users fail',
		};
		beforeEach(() => {
			action = new UsersActions.LoadUsersFail(payload);
		});

		it('should create LoadUsersFail action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.LoadUsersFail,
				payload,
			});
		});
	});

	describe('ToggleEventManagerRole', () => {
		const payload: User = user;
		beforeEach(() => {
			action = new UsersActions.ToggleEventManagerRole(payload);
		});

		it('should create ToggleEventManagerRole action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.ToggleEventManagerRole,
				payload,
			});
		});
	});

	describe('ToggleEventManagerRoleSuccess', () => {
		const payload: User = user;
		beforeEach(() => {
			action = new UsersActions.ToggleEventManagerRoleSuccess(payload);
		});

		it('should create ToggleEventManagerRoleSuccess action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.ToggleEventManagerRoleSuccess,
				payload,
			});
		});
	});

	describe('ToggleEventManagerRoleFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'update user fail',
		};
		beforeEach(() => {
			action = new UsersActions.ToggleEventManagerRoleFail(payload);
		});

		it('should create ToggleEventManagerRoleFail action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.ToggleEventManagerRoleFail,
				payload,
			});
		});
	});

	describe('RemoveUser', () => {
		const payload: User = user;
		beforeEach(() => {
			action = new UsersActions.RemoveUser(payload);
		});

		it('should create RemoveUser action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveUser,
				payload,
			});
		});
	});

	describe('RemoveUserSuccess', () => {
		const payload: User = user;
		beforeEach(() => {
			action = new UsersActions.RemoveUserSuccess(payload);
		});

		it('should create RemoveUser action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveUserSuccess,
				payload,
			});
		});
	});

	describe('RemoveUserFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'remove user fail',
		};
		beforeEach(() => {
			action = new UsersActions.RemoveUserFail(payload);
		});

		it('should create RemoveUserFail action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveUserFail,
				payload,
			});
		});
	});

	describe('RemoveSelectedUsers', () => {
		const payload: string[] = [user.id];
		beforeEach(() => {
			action = new UsersActions.RemoveSelectedUsers(payload);
		});

		it('should create RemoveSelectedUsers action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveSelectedUsers,
				payload,
			});
		});
	});

	describe('RemoveSelectedUsersSuccess', () => {
		const payload: string[] = [user.id];
		beforeEach(() => {
			action = new UsersActions.RemoveSelectedUsersSuccess(payload);
		});

		it('should create RemoveSelectedUsersSuccess action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveSelectedUsersSuccess,
				payload,
			});
		});
	});

	describe('RemoveSelectedUsersFail', () => {
		const payload: Error = {
			name: 'test error',
			message: 'remove selected users fail',
		};
		beforeEach(() => {
			action = new UsersActions.RemoveSelectedUsersFail(payload);
		});

		it('should create RemoveUserFail action', () => {
			expect({ ...action }).toEqual({
				type: UsersActions.UsersActionType.RemoveSelectedUsersFail,
				payload,
			});
		});
	});

});
