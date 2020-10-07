import * as AuthActions from './auth.actions';
import { User } from '../../models/user';
import { UserCredentials } from '../../models/user-credentials';
import { AuthActionTypes, UpdateUserInfo, UpdateUserInfoFail, UpdateUserInfoSuccess } from './auth.actions';
import { AuthState } from '../../models/auth-state';
import { SignInByGithub } from './auth.actions';
import { authReducer, initialState } from './auth.reducer';

describe('Sign In Success', () => {
	let action: AuthActions.SignInSuccess;
	const payload: User = {
		id: '1',
		email: 'test@test.test',
		isAdmin: true,
		claims: [],
	};
	beforeEach(() => {
		action = new AuthActions.SignInSuccess(payload);
	});
	it('should create SignInSuccess action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignInSuccess,
			payload,
		});
	});
});

describe('Sign In Failure', () => {
	let action: AuthActions.SignInFailure;
	const payload: Error = {
		name: 'test error',
		message: 'this is test error',
	};
	beforeEach(() => {
		action = new AuthActions.SignInFailure(payload);
	});
	it('should create SignInFailure action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignInFailure,
			payload,
		});
	});
});

describe('Sign In', () => {
	let action: AuthActions.SignIn;
	const payload: UserCredentials = {
		email: 'test@test.test',
		password: 'test',
	};
	beforeEach(() => {
		action = new AuthActions.SignIn(payload);
	});
	it('should create SignIn action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignIn,
			payload,
		});
	});
});

describe('Sign In By Github', () => {
	let action: AuthActions.SignInByGithub;
	beforeEach(() => {
		action = new AuthActions.SignInByGithub();
	});
	it('should create SignInByGithub action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignInByGithub,
		});
	});
});

describe('Sign Up Success', () => {
	let action: AuthActions.SignUpSuccess;
	const payload: User = {
		id: '1',
		email: 'test@test.test',
		isAdmin: true,
		claims: [],
	};
	beforeEach(() => {
		action = new AuthActions.SignUpSuccess(payload);
	});
	it('hould create SignUpSuccess action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignUpSuccess,
			payload,
		});
	});
});

describe('Sign Up Failure', () => {
	let action: AuthActions.SignUpFailure;
	const payload: Error = {
		name: 'test error',
		message: 'sign up failed',
	};
	beforeEach(() => {
		action = new AuthActions.SignUpFailure(payload);
	});
	it('should create SignUpFailure action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignUpFailure,
			payload,
		});
	});
});

describe('Sign Up', () => {
	let action: AuthActions.SignUp;
	const payload: UserCredentials = {
		email: 'test@test.test',
		password: 'test',
	};
	beforeEach(() => {
		action = new AuthActions.SignUp(payload);
	});
	it('should create SignUp action', () => {
		expect({ ...action }).toEqual({
			type: AuthActions.AuthActionTypes.SignUp,
			payload,
		});
	});
});

describe('Update User Info', () => {
	let action: AuthActions.UpdateUserInfo;
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
		action = new AuthActions.UpdateUserInfo({ user });
	});
	it('should create Update User action', () => {
		expect({ ...action }).toEqual({
			type: AuthActionTypes.UpdateUserInfo,
			payload: { user },
		});
	});
});

describe('update User Info Success', () => {
	let action: AuthActions.UpdateUserInfoSuccess;
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
		action = new AuthActions.UpdateUserInfoSuccess({ user });
	});
	it('should create UpdateUserInfoSuccess action', () => {
		expect({ ...action }).toEqual({
			type: AuthActionTypes.UpdateUserInfoSuccess,
			payload: { user },
		});
	});
});

describe('update User Failure', () => {
	let action: AuthActions.UpdateUserInfoFail;
	const error: Error = {
		name: 'test error',
		message: 'sign up failed',
	};
	beforeEach(() => {
		action = new AuthActions.UpdateUserInfoFail({ message: error });
	});
	it('should create UpdateUserInfoFailedAction action', () => {
		expect({ ...action }).toEqual({
			type: AuthActionTypes.UpdateUserInfoFail,
			payload: { message: error },
		});
	});
});
