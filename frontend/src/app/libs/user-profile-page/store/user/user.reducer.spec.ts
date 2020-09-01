import { initialState, userReducer } from './user.reducer';
import {
	GetUserFromAuthAction,
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionType,
} from './user.actions';
import { UserState } from './user-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { User } from '../../../auth/models/user';

describe('UserReducers', () => {
	describe('Init', () => {
		it('should return the initial state', () => {
			const action: any = {} as any;
			const result: any = userReducer(initialState, action);
			expect(result).toBe(initialState);
		});
	});

	describe('GetUserFromAuth', () => {
		it('should return the user.status - true', () => {
			const action: UserActionType = new GetUserFromAuthAction();
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData.status).toBe(EntityStatus.Success);
		});
	});

	describe('GetUserFromAuthSuccessfuly', () => {
		it('should return the user.status - true and user', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			const action: UserActionType = new GetUserFromAuthSuccessfullyAction({ user });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('GetUserFromAuthFailed', () => {
		it('should return the user.status - true', () => {
			const err: any = {
				message: 'testError',
			};
			const action: UserActionType = new GetUserFromAuthFailedAction(err);
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: err,
			});
		});
	});

	describe('UpdateUser', () => {
		it('should return user', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			const action: UserActionType = new UpdateUserAction({ user });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoSuccessfuly', () => {
		it('should return user', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			const action: UserActionType = new UpdateUserInfoSuccessfulyAction({ user });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoFailed', () => {
		it('should return error', () => {
			const err: any = {
				message: 'testError',
			};
			const action: UserActionType = new UpdateUserInfoFailedAction(err);
			const newState: UserState = userReducer(initialState, action);
			expect(newState.userData).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: err,
			});
		});
	});
});
