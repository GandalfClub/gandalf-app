import { TestBed } from '@angular/core/testing';

import { AuthConverter } from './auth-converter.service';
import { UserDto } from '../models/user-dto';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';

describe('AuthConverterService', () => {
	let service: AuthConverter;
	let createdUser: User;
	let createdUserChanges: UserDto;

	const userDto: UserDto = {
		email: '1@1.com',
		isAdmin: false,
		_id: 'test',
		firstName: 'undefined',
		mobilePhone: 'undefined',
		secondName: 'undefined',
		password: 'undefined',
		claims: [],
	};

	const user: User = {
		email: '1@1.com',
		isAdmin: false,
		id: 'test',
		firstName: 'undefined',
		mobilePhone: 'undefined',
		secondName: 'undefined',
		password: 'undefined',
		claims: [],
	};

	const userUnchange: User = {
		...userDto,
		id: 'test',
	};

	const userChanges: UserDto = {
		...user,
		_id: 'test',
	};

	const authResponse: AuthResponse = {
		isCompetitionActive: false,
		logged: true,
		message: 'test',
		status: 0,
		user: userDto,
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(AuthConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertFromDto method should rename "_id" key', () => {
		beforeEach(() => {
			createdUser = service.convertFromDto(userDto);
		});

		it('should rename "_id" key', () => {
			expect(createdUser).toEqual(userUnchange);
		});
	});

	describe('convertToDto  method should rename "id" key', () => {
		beforeEach(() => {
			createdUserChanges = service.convertToDto(user);
		});

		it('should rename "id" key', () => {
			expect(createdUserChanges).toEqual(userChanges);
		});
	});
});
