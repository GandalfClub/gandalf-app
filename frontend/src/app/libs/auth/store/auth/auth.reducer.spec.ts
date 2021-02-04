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
	LoadUser,
	LoadUserSuccess,
	LoadUserFail,
} from './auth.actions';
import { AuthState } from '../../models/auth-state';
import { EntityStatus } from '../../models/entity-status';
import { User } from '../../models/user';
import { UserClaim } from 'src/app/libs/admin-role-management/models/user-claims.enum';

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

	describe('SignInFail', () => {
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
		let user: User = {
			id: 'test',
			email: 'test@test.com',
			isAdmin: false,
			firstName: 'TestFirstName',
			secondName: 'TestSecondName',
			mobilePhone: '+375291234567',
			password: 'Qqqqqqq1!',
			claims: [],
		};
		beforeEach(() => {
			action = new SignUp(user);
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

	describe('SignUpFail', () => {
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
				status: EntityStatus.Pending,
				value: user,
			});
		});
	});

	describe('UpdateUserInfoSuccess', () => {
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

	describe('UpdateUserInfoFail', () => {
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

	describe('LoadUser', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		beforeEach(() => {
			action = new LoadUser();
			newState = authReducer(initialState, action);
		});
		it('should return the user.status - Pending', () => {
			expect(newState.user.status).toBe(EntityStatus.Pending);
		});
	});

	describe('LoadUserSuccess', () => {
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
			claims: [UserClaim.Admin]
		};
		beforeEach(() => {
			action = new LoadUserSuccess({ user });
			newState = authReducer(initialState, action);
		});
		it('should return user', () => {
			expect(newState.user).toEqual({
				status: EntityStatus.Success,
				value: user,
			});
		});
	});

	describe('LoadUserFail', () => {
		let action: AuthActions = {} as AuthActions;
		let newState: AuthState;
		const err: any = {
			message: 'testError',
		};
		beforeEach(() => {
			action = new LoadUserFail(err);
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
