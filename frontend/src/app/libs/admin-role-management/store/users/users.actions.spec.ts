import { User } from '../../../auth/models/user';
import * as UsersActions from './users.actions';

describe('EventConverterService', () => {
	let action: UsersActions.LoadUsers |
	UsersActions.LoadUsersFail |
	UsersActions.LoadUsersSuccess |
	UsersActions.ToggleEventManagerRole |
	UsersActions.ToggleEventManagerRoleFail;

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
			{
				id: '1',
				email: 'test@test.test',
				isAdmin: true,
				claims: [],
			},
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
	describe('Toggle EventManager role', () => {
		const payload: User = {
			firstName: 'test',
			secondName: 'test',
			mobilePhone: 'test',
			id: 'test',
			isAdmin: false,
			email: 'test@test.by',
			password: 'test',
			claims: [],
		};
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
});
