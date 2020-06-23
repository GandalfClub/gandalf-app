import * as SampleActions from './sample.actions';

describe('Sample', () => {
	it('should create an instance', () => {
		expect(new SampleActions.LoadSamples()).toBeTruthy();
	});
});
