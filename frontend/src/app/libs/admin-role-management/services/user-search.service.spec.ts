import { TestBed } from '@angular/core/testing';
import { User } from '../../auth/models/user';

import { UserSearchService } from './user-search.service';

describe('UserSearchService', () => {
	let service: UserSearchService;
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

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserSearchService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('whith empty search input', () => {
		it('should return all users', () => {
			expect(service.userSearch([user], '')).toEqual([user]);
		});
	});
	describe('if user doesn"t match with search input', () => {
		it('should return empty array', () => {
			expect(service.userSearch([user], '123')).toEqual([]);
		});
	});
	describe('if users matchs with search input', () => {
		it('should return all matched users', () => {
			expect(service.userSearch([user], 'test')).toEqual([user]);
		});
	});
});
