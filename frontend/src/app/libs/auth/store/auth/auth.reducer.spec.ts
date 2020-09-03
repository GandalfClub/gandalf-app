import { authReducer, initialState } from './auth.reducer';
import {
	AuthActions,
	SignIn,
	SignInByGithub,
	SignUp,
	SignInSuccess,
	SignInFailure,
	SignUpFailure,
	SignUpSuccess,
	UpdateUserInfo,
	UpdateUserInfoSuccess,
	UpdateUserInfoFail,
} from './auth.actions';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';
import { User } from '../../models/user';

describe('AuthReducers', () => {
	describe('Init', () => {
		it('should return the initial state', () => {
			const action: any = {} as any;
			const result: any = authReducer(initialState, action);
			expect(result).toBe(initialState);
		});
	});

	describe('SignIn', () => {
		it('should return the user.status - Pending', () => {
			const action: AuthActions = new SignIn({ email: '', password: '' });
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignInByGithub', () => {
		it('should return the user.status - Pending', () => {
			const action: AuthActions = new SignInByGithub();
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignInSuccess', () => {
		it('should return the user', () => {
			const user: User = {
				id: '0',
				isAdmin: false,
				email: 'test@mail.t',
			};
			const action: AuthActions = new SignInSuccess(user);
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('SignInFalure', () => {
		it('should return the error', () => {
			const error: Error = {
				name: 'testError',
				message: 'errors works fine',
			};
			const action: AuthActions = new SignInFailure(error);
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				error,
			});
		});
	});

	describe('SignUp', () => {
		it('should return the user.status - Pending', () => {
			const action: AuthActions = new SignUp({ email: '', password: '' });
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignUpSuccess', () => {
		it('should return user', () => {
			const user: User = {
				id: '0',
				isAdmin: false,
				email: 'test@mail.t',
			};
			const action: AuthActions = new SignUpSuccess(user);
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('SignUpFailure', () => {
		it('should return the error', () => {
			const error: Error = {
				name: 'testError',
				message: 'errors works fine',
			};
			const action: AuthActions = new SignUpFailure(error);
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				error,
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
			const action: AuthActions = new UpdateUserInfo({ user });
			const newState: AuthState = authReducer(initialState, action);
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
			const action: AuthActions = new UpdateUserInfoSuccess({ user });
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
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
			const action: AuthActions = new UpdateUserInfoFail(err);
			const newState: AuthState = authReducer(initialState, action);
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: err,
			});
		});
	});
});
