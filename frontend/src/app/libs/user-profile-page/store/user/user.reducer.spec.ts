import { initialState, userReducer } from './user.reducer';
import {
	GetUserFromAuthAction,
	GetUserFromAuthFailAction,
	GetUserFromAuthSuccessAction,
	UpdateUserAction,
	UpdateUserInfoFailAction,
	UpdateUserInfoSuccessAction,
	UserActionType,
} from './user.actions';
import { UserState } from './user-state';
import { EntityStatus } from '../../../auth/models/entity-status';
import { User } from '../../../auth/models/user';

describe('UserReducers', () => {
	describe('Init', () => {
		it('should return the initial state', () => {
			const action: UserActionType = {} as UserActionType;
			const result: UserState = userReducer(initialState, action);
			expect(result).toBe(initialState);
		});
	});

	describe('GetUserFromAuth', () => {
		it('should return the user.status - true', () => {
			const action: UserActionType = new GetUserFromAuthAction();
			const newState: UserState = userReducer(initialState, action);
			expect(newState.user.status).toBe(EntityStatus.Success);
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
			const action: UserActionType = new GetUserFromAuthSuccessAction({ user });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('GetUserFromAuthFailed', () => {
		it('should return the user.status - true', () => {
			const message: string = 'testError';
			const action: UserActionType = new GetUserFromAuthFailAction({ message });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: { message },
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
			expect(newState.user).toEqual({
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
			const action: UserActionType = new UpdateUserInfoSuccessAction({ user });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoFailed', () => {
		it('should return error', () => {
			const message: string = 'testError';
			const action: UserActionType = new UpdateUserInfoFailAction({ message });
			const newState: UserState = userReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: { message },
			});
		});
	});
});
