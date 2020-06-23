import * as fromSample from './sample.reducer';
import { selectSampleState } from './sample.selectors';

describe('Sample Selectors', () => {
	it('should select the feature state', () => {
		const result: fromSample.State = selectSampleState({
			[fromSample.sampleFeatureKey]: {
				sample: 'sample'
			}
		});

		expect(result).toEqual({
			sample: 'sample'
		});
	});
});
