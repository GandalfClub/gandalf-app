import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
	it('create an instance', () => {
		const pipe: FilterPipe = new FilterPipe();
		expect(pipe).toBeTruthy();
	});
});
