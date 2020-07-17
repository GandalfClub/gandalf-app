import * as AutnActions from './autn.actions';

describe('Autn', () => {
	it('should create an instance', () => {
		expect(new AutnActions.LogInFailure('test')).toBeTruthy();
	});
});
