import { TestBed, async } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { UsersEffects } from './users.effects';
import { UsersRepositoryService } from '../../services/users-repository.service';
import { User } from '../../../auth/models/user';
import { LoadUsers, LoadUsersSuccess, LoadUsersFail, ToggleEventManagerRole, ToggleEventManagerRoleSuccess, ToggleEventManagerRoleFail, RemoveUser, RemoveUserSuccess, RemoveUserFail, RemoveSelectedUsers, RemoveSelectedUsersSuccess, RemoveSelectedUsersFail } from './users.actions';
import { cold, hot } from 'jasmine-marbles';
import { Action } from '@ngrx/store';
import { createSpy } from '../../../auth/helpers/createSpy';
import { AuthConverter } from '../../../auth/services/auth-converter.service';
import { UserDto } from 'src/app/libs/auth/models/user-dto';
import { provideMockActions } from '@ngrx/effects/testing';

describe('Events Effects', () => {
	let mockUsersRepository: jasmine.SpyObj<UsersRepositoryService>;
	let authConverter: AuthConverter;
	let effects: UsersEffects;
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

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthConverter,
				UsersEffects,
				provideMockActions(() => actions),
				{
					provide: UsersRepositoryService,
					useValue: createSpy(UsersRepositoryService.prototype, {}),
				},
			],
		});
		mockUsersRepository = TestBed.inject(UsersRepositoryService) as jasmine.SpyObj<UsersRepositoryService>;
		authConverter = TestBed.inject(AuthConverter);
		effects = TestBed.inject(UsersEffects);
	}));

	it('should be constructed', () => {
		expect(effects).toBeTruthy();
	});

	describe('getUsers', () => {

		describe('when LoadUsers success', () => {
			beforeEach(() => {
				mockUsersRepository.getUsers.and.returnValue(of([userDto]));
				actions = hot('a', { a: new LoadUsers() });
				expected = cold('s', { s: new LoadUsersSuccess([user]) });
			});

			it('should emit LoadUsers action', () => {
				expect(effects.GetUsers).toBeObservable(expected);
			});
		});

		describe('when Load Users fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.getUsers.and.returnValue(throwError(error));
				actions = hot('a', { a: new LoadUsers() });
				expected = cold('s', { s: new LoadUsersFail(error) });
			});

			it('should emit LoadUsersFail action', () => {
				expect(effects.GetUsers).toBeObservable(expected);
			});
		});
	});

	describe('updateUsers', () => {

		describe('when update users success', () => {
			beforeEach(() => {

				mockUsersRepository.updateUser.and.returnValue(of(userDto));
				actions = hot('a', { a: new ToggleEventManagerRole(user) });
				expected = cold('s', { s: new ToggleEventManagerRoleSuccess(user) });
			});

			it('should emit ToggleEventManagerRoleSuccess action', () => {
				expect(effects.SetEventManagerRole).toBeObservable(expected);
			});
		});

		describe('when update Users fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.updateUser.and.returnValue(throwError(error));
				actions = hot('a', { a: new ToggleEventManagerRole(user) });
				expected = cold('s)', { s: new ToggleEventManagerRoleFail(error) });
			});

			it('should emit ToggleEventManagerRoleFail action', () => {
				expect(effects.SetEventManagerRole).toBeObservable(expected);
			});
		});
	});

	describe('remove User', () => {

		describe('when user removing success', () => {
			beforeEach(() => {

				mockUsersRepository.removeUser.and.returnValue(of(userDto));
				actions = hot('a', { a: new RemoveUser(user) });
				expected = cold('s', { s: new RemoveUserSuccess(user) });
			});

			it('should emit RemoveUserSuccess action', () => {
				expect(effects.RemoveUser).toBeObservable(expected);
			});
		});

		describe('when user removing fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.removeUser.and.returnValue(throwError(error));
				actions = hot('a', { a: new RemoveUser(user) });
				expected = cold('s)', { s: new RemoveUserFail(error) });
			});

			it('should emit RemoveUserFail action', () => {
				expect(effects.RemoveUser).toBeObservable(expected);
			});
		});
	});

	describe('remove Users array', () => {

		describe('when users array removing success', () => {
			beforeEach(() => {

				mockUsersRepository.removeSelectedUsers.and.returnValue(of([user.id]));
				actions = hot('a', { a: new RemoveSelectedUsers([user.id]) });
				expected = cold('s', { s: new RemoveSelectedUsersSuccess([user.id]) });
			});

			it('should emit RemoveSelectedUsersSuccess action', () => {
				expect(effects.RemoveSelectedUsers).toBeObservable(expected);
			});
		});

		describe('when users array removing fail', () => {
			beforeEach(() => {
				error = new Error('test');
				mockUsersRepository.removeSelectedUsers.and.returnValue(throwError(error));
				actions = hot('a', { a: new RemoveSelectedUsers([user.id]) });
				expected = cold('s)', { s: new RemoveSelectedUsersFail(error) });
			});

			it('should emit RemoveSelectedUsersFail action', () => {
				expect(effects.RemoveSelectedUsers).toBeObservable(expected);
			});
		});
	});

});
