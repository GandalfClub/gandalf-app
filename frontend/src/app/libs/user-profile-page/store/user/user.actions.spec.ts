import { IUser } from '../../model/user';
import {
	GetUserFromAuthAction,
	GetUserFromAuthFailedAction,
	GetUserFromAuthSuccessfullyAction,
	UpdateUserAction,
	UpdateUserInfoFailedAction,
	UpdateUserInfoSuccessfulyAction,
	UserActionType,
	UserActionTypes,
} from './user.actions';

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
			const user: IUser = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				_id: '0',
				email: 'test@test.test',
			};
			action = new GetUserFromAuthSuccessfullyAction({ user });
			expect({ ...action }).toEqual({
				type: UserActionTypes.GetUserFromAuthSuccessfuly,
				payload: { user },
			});
		});
	});

	describe('Get User From Auth Failure', () => {
		it('should create GetUserFailure action', () => {
			const message: string = 'testError';
			action = new GetUserFromAuthFailedAction({ message });
			expect({ ...action }).toEqual({
				type: UserActionTypes.GetUserFromAuthFailed,
				payload: { message },
			});
		});
	});

	describe('Update', () => {
		it('should create UpdateUser action', () => {
			const user: IUser = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				_id: '0',
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
			const user: IUser = {
				firstName: '1',
				secondName: '1',
				mobilePhone: '1',
				password: '1',
				isAdmin: false,
				_id: '0',
				email: 'test@test.test',
			};
			action = new UpdateUserInfoSuccessfulyAction({ user });
			expect({ ...action }).toEqual({
				type: UserActionTypes.UpdateUserInfoSuccessfuly,
				payload: { user },
			});
		});
	});

	describe('update User Failure', () => {
		it('should create UpdateUserInfoFailedAction action', () => {
			const message: string = 'testError';
			const err: any = {
				message: 'testError',
			};
			action = new UpdateUserInfoFailedAction({ message });
			expect({ ...action }).toEqual({
				type: UserActionTypes.UpdateUserInfoFailed,
				payload: { message },
			});
		});
	});
});
