import { authReducer, initialState } from './auth.reducer';

describe('Auth Reducer', () => {
	describe('an unknown action', () => {
		it('should return the previous state', () => {
			const action: any = {} as any;

			const result: any = authReducer(initialState, action);

			expect(result).toBe(initialState);
		});
	});
});
