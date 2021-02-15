import * as ContainerActions from './container.actions';

describe('Container', () => {
	it('should create an instance', () => {
		expect(new ContainerActions.LoadSamples()).toBeTruthy();
	});
});
