import * as fromContainer from './container.reducer';
import { selectContainerState, selectHideHeader, selectHideFooter } from './container.selectors';

describe('Container Selectors', () => {
	const state: fromContainer.State = {
		hideHeader: false,
		hideFooter: false,
	};

	describe('selectContainerState', () => {
		it('should return the feature state', () => {
			expect(selectContainerState.projector(state)).toEqual(state);
		});
	});

	describe('selectHideHeader', () => {
		it('should return header visibility', () => {
			expect(selectHideHeader.projector(state)).toEqual(false);
		});
	});

	describe('selectHideFooter', () => {
		it('should return footer visibility', () => {
			expect(selectHideFooter.projector(state)).toEqual(false);
		});
	});
});
