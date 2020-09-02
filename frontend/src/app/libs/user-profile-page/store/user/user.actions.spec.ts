import {
	GetUserFromAuthAction,
	GetUserFromAuthFailAction,
	GetUserFromAuthSuccessAction,
	UpdateUserAction,
	UpdateUserInfoFailAction,
	UpdateUserInfoSuccessAction,
	UserActionType,
	UserActionTypes,
} from './user.actions';
import { User } from '../../../auth/models/user';

describe('UserActions', () => {
	let action: UserActionType;
	describe('Get User', () => {
		beforeEach(() => {
			action = new GetUserFromAuthAction();
		});
		it('should create GetUser action', () => {
			expect({ ...action }).toEqual({
				type: UserActionTypes.GetUserFromAuth,
			});
		});
	});

	describe('Get User From Auth Successfully', () => {
		it('should create GetUserSuccess action', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			action = new GetUserFromAuthSuccessAction({ user });
			expect({ ...action }).toEqual({
				type: UserActionTypes.GetUserFromAuthSuccess,
				payload: { user },
			});
		});
	});

	describe('Get User From Auth Failure', () => {
		it('should create GetUserFailure action', () => {
			const message: string = 'testError';
			action = new GetUserFromAuthFailAction({ message });
			expect({ ...action }).toEqual({
				type: UserActionTypes.GetUserFromAuthFail,
				payload: { message },
			});
		});
	});

	describe('Update', () => {
		it('should create UpdateUser action', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			action = new UpdateUserAction({ user });
			expect({ ...action }).toEqual({
				type: UserActionTypes.UpdateUser,
				payload: { user },
			});
		});
	});

	describe('update User Successfully', () => {
		it('should create UpdateUserInfoSuccessfulyAction action', () => {
			const user: User = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				id: '0',
				email: 'test@test.test',
			};
			action = new UpdateUserInfoSuccessAction({ user });
			expect({ ...action }).toEqual({
				type: UserActionTypes.UpdateUserInfoSuccess,
				payload: { user },
			});
		});
	});

	describe('update User Failure', () => {
		it('should create UpdateUserInfoFailedAction action', () => {
			const message: string = 'testError';
			action = new UpdateUserInfoFailAction({ message });
			expect({ ...action }).toEqual({
				type: UserActionTypes.UpdateUserInfoFail,
				payload: { message },
			});
		});
	});
});
