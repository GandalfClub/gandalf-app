import { FilterPipe } from './filter.pipe';
import { User } from '../../auth/models/user';

describe('FilterPipe', () => {
	it('create an instance', () => {
		const pipe: FilterPipe = new FilterPipe();
		expect(pipe).toBeTruthy();
	});
});

describe('FilterPipe', () => {
	const user: User = {
		id: 'test',
		firstName: 'John',
		secondName: 'Connor',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};
	const pipe: FilterPipe = new FilterPipe();

	it('return user if search string empty', () => {
		expect(pipe.transform(user, '')).toBeTruthy();
	});

	it('return user if search query equal user email', () => {
		expect(pipe.transform(user, 'test')).toBeTruthy();
	});

	it('return user if search query equal user name', () => {
		expect(pipe.transform(user, 'joh')).toBeTruthy();
	});

	it('return user if search query equal user surname', () => {
		expect(pipe.transform(user, 'conn')).toBeTruthy();
	});

	it('return false if search string not equal', () => {
		expect(pipe.transform(user, 'tests')).toBeFalsy();
	});
});
