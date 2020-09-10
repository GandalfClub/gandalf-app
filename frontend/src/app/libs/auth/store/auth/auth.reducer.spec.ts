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
		const action: AuthActions = {} as AuthActions;
		let result: AuthState;
		beforeEach(() => {
			result = authReducer(initialState, action);
		});
		it('should return the initial state', () => {
			expect(result).toBe(initialState);
		});
	});

	describe('SignIn', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		beforeEach(() => {
			action = new SignIn({ email: '', password: '' });
			newState = authReducer(initialState, action);
		});
		it('should return the user.status - Pending', () => {
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignInByGithub', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		beforeEach(() => {
			action = new SignInByGithub();
			newState = authReducer(initialState, action);
		});
		it('should return the user.status - Pending', () => {
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignInSuccess', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const user: User = {
			id: '0',
			isAdmin: false,
			email: 'test@mail.t',
			claims: [],
		};
		beforeEach(() => {
			action = new SignInSuccess(user);
			newState = authReducer(initialState, action);
		});
		it('should return the user', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('SignInFalure', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const error: Error = {
			name: 'testError',
			message: 'errors works fine',
		};
		beforeEach(() => {
			action = new SignInFailure(error);
			newState = authReducer(initialState, action);
		});
		it('should return the error', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				error,
			});
		});
	});

	describe('SignUp', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		beforeEach(() => {
			action = new SignUp({ email: '', password: '' });
			newState = authReducer(initialState, action);
		});
		it('should return the user.status - Pending', () => {
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('SignUpSuccess', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const user: User = {
			id: '0',
			isAdmin: false,
			email: 'test@mail.t',
			claims: [],
		};
		beforeEach(() => {
			action = new SignUpSuccess(user);
			newState = authReducer(initialState, action);
		});
		it('should return user', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('SignUpFailure', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const error: Error = {
			name: 'testError',
			message: 'errors works fine',
		};
		beforeEach(() => {
			action = new SignUpFailure(error);
			newState = authReducer(initialState, action);
		});
		it('should return the error', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				error,
			});
		});
	});

	describe('UpdateUser', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const user: User = {
			firstName: '1',
			secondName: '1',
			mobilePhone: '1',
			password: '1',
			isAdmin: false,
			id: '0',
			email: 'test@test.test',
			claims: [],
		};
		beforeEach(() => {
			action = new UpdateUserInfo({ user });
			newState = authReducer(initialState, action);
		});
		it('should return user', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoSuccessfuly', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const user: User = {
			firstName: '1',
			secondName: '1',
			mobilePhone: '1',
			password: '1',
			isAdmin: false,
			id: '0',
			email: 'test@test.test',
			claims: [],
		};
		beforeEach(() => {
			action = new UpdateUserInfoSuccess({ user });
			newState = authReducer(initialState, action);
		});
		it('should return user', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoFailed', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const err: any = {
			message: 'testError',
		};
		beforeEach(() => {
			action = new UpdateUserInfoFail(err);
			newState = authReducer(initialState, action);
		});
		it('should return error', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Error,
				value: null,
				error: err,
			});
		});
	});
});
