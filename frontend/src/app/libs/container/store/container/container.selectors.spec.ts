import * as fromContainer from './container.reducer';
import { selectContainerState } from './container.selectors';

describe('Container Selectors', () => {
	it('should select the feature state', () => {
		const result: fromContainer.State = selectContainerState({
			[fromContainer.containerFeatureKey]: {
				container: 'container'
			}
		});

		expect(result).toEqual({
			container: 'container'
		});
	});
});
