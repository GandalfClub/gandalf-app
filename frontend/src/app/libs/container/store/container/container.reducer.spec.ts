import { containerReducer, initialState } from './container.reducer';

describe('Container Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = containerReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
