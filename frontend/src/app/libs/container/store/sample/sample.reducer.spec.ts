import { reducer, initialState } from './sample.reducer';
import { State } from '@ngrx/store';

describe('Sample Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = reducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
