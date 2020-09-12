import { UsersRepositoryService } from './users-repository.service';
import { UserDto } from '../../auth/models/user-dto';
import { of } from 'rxjs';

describe('EventsService', () => {
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
	let eventsRepository: UsersRepositoryService;

	const httpSpy: any = jasmine.createSpyObj('http', ['get']);

	beforeEach(() => {
		eventsRepository = new UsersRepositoryService(httpSpy);
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
});
