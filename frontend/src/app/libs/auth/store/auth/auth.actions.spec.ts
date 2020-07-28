import * as AutnActions from './auth.actions';

describe('Auth', () => {
	it('should create an instance', () => {
		expect(new AutnActions.SignInFailure('Failed')).toBeTruthy();
	});
});
