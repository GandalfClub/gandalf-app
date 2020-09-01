import { TestBed } from '@angular/core/testing';

import { UserConverter } from './user-converter.service';
import { UserDto } from '../model/user-dto';
import { User } from '../../auth/models/user';
import { UserChanges } from '../model/user-changes';

describe('UserConverterService', () => {
	let service: UserConverter;
	let createdUser: User;
	let createdUserChanges: UserChanges;

	const userDto: UserDto = {
		email: '1@1.com',
		isAdmin: false,
		_id: 'test',
	};

	const user: User = {
		email: '1@1.com',
		isAdmin: false,
		id: 'test',
	};

	const userChanges: UserChanges = {
		_id: 'test',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(UserConverter);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('convertFromDto methodshould rename "_id" key', () => {
		beforeEach(() => {
			createdUser = service.convertFromDto(userDto);
		});

		it('should rename "_id" key', () => {
			expect(createdUser).toEqual(user);
		});
	});

	describe('convertToDto  methodshould rename "id" key', () => {
		beforeEach(() => {
			createdUserChanges = service.convertToDto(user);
		});

		it('should rename "id" key', () => {
			expect(createdUserChanges).toEqual(userChanges);
		});
	});
});
