import { UsersRepositoryService } from './users-repository.service';
import { UserDto } from '../../auth/models/user-dto';
import { of } from 'rxjs';
import { User } from '../../auth/models/user';

describe('EventsService', () => {
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
	const userDto: UserDto = {
		_id: 'test',
		firstName: 'John',
		secondName: 'Connor',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	const userDtoWithoutPassword: UserDto = {
		_id: 'test',
		firstName: 'John',
		secondName: 'Connor',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		claims: [],
	};
	let eventsRepository: UsersRepositoryService;

	const httpSpy: any = jasmine.createSpyObj('http', ['get', 'post', 'delete']);
	const authConverter: any = jasmine.createSpyObj('authConverter', ['convertFromDto', 'convertToDto', 'convertUsersFromDto']);

	beforeEach(() => {
		eventsRepository = new UsersRepositoryService(httpSpy, authConverter);
	});

	it('should be created', () => {
		expect(eventsRepository).toBeTruthy();
	});

	describe('when getUsers called', () => {
		beforeEach(() => {
			httpSpy.get.and.returnValue(of([userDto]));
		});

		it('should called with get method and users path and return array of users', () => {
			eventsRepository.getUsers().subscribe((users: UserDto[]) => {
				expect(httpSpy.get).toHaveBeenCalledWith('/api/users');
				expect(users).toEqual([userDto]);
			});
		});
	});

	describe('when updateUser called', () => {
		beforeEach(() => {
			httpSpy.post.and.returnValue(of(userDto));
			authConverter.convertToDto.and.returnValue(userDto);
		});

		it('should called with post method and update-user path and return array of users', () => {
			eventsRepository.updateUser(user).subscribe((updatedUser: UserDto) => {
				expect(httpSpy.post).toHaveBeenCalledWith('/api/users/update-user', userDtoWithoutPassword);
				expect(updatedUser).toEqual(userDto);
			});
		});
	});

	describe('when removeUser called', () => {
		beforeEach(() => {
			httpSpy.delete.and.returnValue(of(userDto));
			authConverter.convertToDto.and.returnValue(userDto);
		});

		it('should called with delete method and user/:userId path and return array of users', () => {
			eventsRepository.removeUser(user).subscribe((removedUser: UserDto) => {
				expect(httpSpy.delete).toHaveBeenCalledWith(`/api/users/${userDto._id}`);
				expect(removedUser).toEqual(userDto);
			});
		});
	});

	describe('when removeSelectedUsers called', () => {
		beforeEach(() => {
			httpSpy.post.and.returnValue(of([userDto._id]));
		});

		it('should called with post method and users/remove-users path and return array of users id', () => {
			eventsRepository.removeSelectedUsers([userDto._id]).subscribe((usersId: string[]) => {
				expect(httpSpy.post).toHaveBeenCalledWith(`/api/users/remove-users`, [userDto._id]);
				expect(usersId).toEqual([userDto._id]);
			});
		});
	});
});
