import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UsersFacadeService } from './users.facade';
import { UsersState } from './users-state';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { User } from '../../../auth/models/user';
import { first } from 'rxjs/operators';
import { MemoizedSelector } from '@ngrx/store';
import { selectUsers, selectUsersValue } from './users.selectors';

describe('Users FacadeService', () => {
	let mockStore: MockStore<UsersState>;
	let usersFacadeService: UsersFacadeService;
	let user: User;
	let users: EntityWrapper<User[]>;
	let initialState: UsersState = { users };
	let mockEventsSelectorSelectUsers: MemoizedSelector<UsersState, EntityWrapper<User[]>>;
	let mockEventsSelectorSelectUsersValue: MemoizedSelector<UsersState, User[]>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UsersFacadeService, provideMockStore({ initialState })],
		});
		usersFacadeService = TestBed.inject(UsersFacadeService);
		mockStore = TestBed.inject(MockStore);
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
		users = {
			status: EntityStatus.Success,
			value: [user],
		};
		initialState = { users };
	});

	describe('method users$', () => {
		it('should return users', () => {
			mockEventsSelectorSelectUsers = mockStore.overrideSelector(selectUsers, users);
			usersFacadeService.users$.pipe(first()).subscribe((result: EntityWrapper<User[]>) => {
				return expect(result).toEqual(users);
			});
		});
	});

	describe('method usersValue$', () => {
		it('should return users value', () => {
			mockEventsSelectorSelectUsersValue = mockStore.overrideSelector(selectUsersValue, [user]);
			usersFacadeService.usersValue$.pipe(first()).subscribe((result: User[]) => {
				expect(result).toEqual(users.value);
			});
		});
	});
});
