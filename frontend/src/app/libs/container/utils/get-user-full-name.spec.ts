import { getUserFullName } from './get-user-full-name';

describe('when call getUserFullName', () => {
	describe('when firstName or lastName is not empty', () => {
		it('should return firstName and lastName concatenation divided with space', () => {
			expect(getUserFullName('1', '2')).toEqual('1 2');
		});
	});

	describe('when firstName and lastName is empty', () => {
		it('should return empty string', () => {
			expect(getUserFullName(' ', '  ')).toEqual('');
		});
	});
});
