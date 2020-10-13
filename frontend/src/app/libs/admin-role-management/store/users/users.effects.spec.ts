import { TestBed, async } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { UsersEffects } from './users.effects';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { User } from '../../../auth/models/user';
import { LoadUsers, LoadUsersSuccess, LoadUsersFail, ToggleEventManagerRole, ToggleEventManagerRoleSuccess, ToggleEventManagerRoleFail } from './users.actions';
import { cold, hot } from 'jasmine-marbles';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { createSpy } from '../../../auth/helpers/createSpy';
import { AuthConverter } from '../../../auth/services/auth-converter.service';
import { UserDto } from 'src/app/libs/auth/models/user-dto';

describe('Events Effects', () => {
	let mockUsersRepository: jasmine.SpyObj<UsersRepositoryService>;
	let authConverter: AuthConverter;
	let user: User;
	let userDto: UserDto;
	let error: Error;
	let actions: Observable<Action>;
	let expected: Observable<Action>;

	user = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	userDto = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		_id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	function createEffects(source: Observable<Action>): UsersEffects {
		return new UsersEffects(new Actions(source), mockUsersRepository, authConverter);
	}

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: UsersRepositoryService,
					useValue: createSpy(UsersRepositoryService.prototype, {
						getUsers: jasmine.createSpy().and.returnValue(of([user])),
					}),
				},
			],
		});
		mockUsersRepository = TestBed.inject(UsersRepositoryService) as jasmine.SpyObj<UsersRepositoryService>;
		authConverter = TestBed.inject(AuthConverter);
	}));

	describe('getUsers', () => {

		describe('when LoadUsers success', () => {
			beforeEach(() => {
				mockUsersRepository.getUsers.and.returnValue(of([userDto]));
				actions = hot('-a-|', { a: new LoadUsers() });
				expected = cold('-s-|', { s: new LoadUsersSuccess([user]) });
			});

			it('should emit LoadUsers action', () => {
				expect(createEffects(actions).GetUsers).toBeObservable(expected);
			});
		});

		describe('when Load Users fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.getUsers.and.throwError(error);
				actions = hot('-a|', { a: new LoadUsers() });
				expected = cold('-(s|)', { s: new LoadUsersFail(error) });
			});

			it('should emit LoadUsersFail action', () => {
				expect(createEffects(actions).GetUsers).toBeObservable(expected);
			});
		});
	});

	describe('updateUsers', () => {

		describe('when update users success', () => {
			beforeEach(() => {

				mockUsersRepository.updateUser.and.returnValue(of(userDto));
				actions = hot('-a-|', { a: new ToggleEventManagerRole(user) });
				expected = cold('-s-|', { s: new ToggleEventManagerRoleSuccess() });
			});

			it('should emit ToggleEventManagerRoleSuccess action', () => {
				expect(createEffects(actions).SetEventManagerRole).toBeObservable(expected);
			});
		});

		describe('when update Users fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.updateUser.and.throwError(error);
				actions = hot('-a|', { a: new ToggleEventManagerRole(user) });
				expected = cold('-(s|)', { s: new ToggleEventManagerRoleFail(error) });
			});

			it('should emit ToggleEventManagerRoleFail action', () => {
				expect(createEffects(actions).SetEventManagerRole).toBeObservable(expected);
			});
		});
	});
});
