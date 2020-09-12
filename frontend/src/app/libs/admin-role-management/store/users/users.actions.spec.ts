import { User } from '../../../auth/models/user';
import * as UsersActions from './users.actions';

describe('EventConverterService', () => {
	let action: UsersActions.LoadUsers | UsersActions.LoadUsersFail | UsersActions.LoadUsersSuccess;

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
});
