import { TestBed } from '@angular/core/testing';

import { UserConverter } from './user-converter.service';

import { User } from '../../auth/models/user';
import { UserDto } from '../../auth/models/user-dto';

describe('EventConverterService', () => {
	let service: UserConverter;
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
		service = TestBed.inject(UserConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertUserFromDto method should rename "_id" key', () => {
		beforeEach(() => {
			convertedUser = service.convertUserFromDto(userDto);
		});

		it('should rename "_id" key', () => {
			expect(convertedUser).toEqual(user);
		});
	});

	describe('convertUserToDto method should rename "id" key', () => {
		beforeEach(() => {
			convertedUser = service.convertUserToDto(user);
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
