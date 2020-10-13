import { TestBed } from '@angular/core/testing';

import { AuthConverter } from './auth-converter.service';
import { UserDto } from '../models/user-dto';
import { User } from '../models/user';

describe('AuthConverterService', () => {
	let service: AuthConverter;
	const user: User = {
		id: 'test',
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	const userDto: UserDto = {
		_id: 'test',
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	let convertedUser: User | UserDto;
	let convertedUsers: User[];

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertUserFromDto method should rename "_id" key', () => {
		beforeEach(() => {
			convertedUser = service.convertFromDto(userDto);
		});

		it('should rename "_id" key', () => {
			expect(convertedUser).toEqual(user);
		});
	});

	describe('convertUserToDto method should rename "id" key', () => {
		beforeEach(() => {
			convertedUser = service.convertToDto(user);
		});

		it('should rename "id" key', () => {
			expect(convertedUser).toEqual(userDto);
		});
	});

	describe('convertUsersFromDto method should rename "_id" key', () => {
		beforeEach(() => {
			convertedUsers = service.convertUsersFromDto([userDto]);
		});

		it('should rename "_id" key', () => {
			expect(convertedUsers).toEqual([user]);
		});
	});
});
