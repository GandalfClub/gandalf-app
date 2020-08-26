import * as AuthActions from './auth.actions';
import { User } from '../../models/user';
import { UserCredentials } from '../../models/user-credentials';

describe('Sign In Success', () => {
	it('should create SignInSuccess action', () => {
		const payload: User = {
			id: '1',
			email: 'test@test.test',
			isAdmin: true,
		};
		const action: AuthActions.SignInSuccess = new AuthActions.SignInSuccess(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignInSuccess,
			payload,
		});
	});
});

describe('Sign In Failure', () => {
	it('should create SignInFailure action', () => {
		const payload: Error = {
			name: 'test error',
			message: 'this is test error',
		};
		const action: AuthActions.SignInFailure = new AuthActions.SignInFailure(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignInFailure,
			payload,
		});
	});
});

describe('Sign In', () => {
	it('should create SignIn action', () => {
		const payload: UserCredentials = {
			email: 'test@test.test',
			password: 'test',
		};
		const action: AuthActions.SignIn = new AuthActions.SignIn(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignIn,
			payload,
		});
	});
});

describe('Sign In By Github', () => {
	it('should create SignInByGithub action', () => {
		const action: AuthActions.SignInByGithub = new AuthActions.SignInByGithub();
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignInByGithub,
		});
	});
});

describe('Sign Up Success', () => {
	it('hould create SignUpSuccess action', () => {
		const payload: User = {
			id: '1',
			email: 'test@test.test',
			isAdmin: true,
		};
		const action: AuthActions.SignUpSuccess = new AuthActions.SignUpSuccess(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignUpSuccess,
			payload,
		});
	});
});

describe('Sign Up Failure', () => {
	it('should create SignUpFailure action', () => {
		const payload: Error = {
			name: 'test error',
			message: 'sign up failed',
		};
		const action: AuthActions.SignUpFailure = new AuthActions.SignUpFailure(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignUpFailure,
			payload,
		});
	});
});

describe('Sign Up', () => {
	it('should create SignUp action', () => {
		const payload: UserCredentials = {
			email: 'test@test.test',
			password: 'test',
		};
		const action: AuthActions.SignUp = new AuthActions.SignUp(payload);
		expect({...action}).toEqual({
			type: AuthActions.AuthActionTypes.SignUp,
			payload,
		});
	});
});
