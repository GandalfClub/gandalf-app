import * as AuthActions from './auth.actions';

describe('Auth', () => {
	it('should create an instance', () => {
		expect(new AuthActions.SignInFailure('Failed')).toBeTruthy();
	});
});
