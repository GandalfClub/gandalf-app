import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first } from 'rxjs/operators';
import { MemoizedSelector } from '@ngrx/store';
import { UserState } from './user-state';
import { UserFacadeService } from './user.facade';
import { selectUser } from './user.selectors';
import { EntityWrapper } from '../../../auth/models/entity-wraper';
import { EntityStatus } from '../../../auth/models/entity-status';
import { User } from '../../../auth/models/user';

describe('User Facade Service', () => {
	let mockStore: MockStore<UserState>;
	let mockUserSelector: MemoizedSelector<UserState, EntityWrapper<User>>;
	let userFacadeService: UserFacadeService;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
	};
	const initialState: UserState = {
		userData: user,
	};
	const userUpdate: User = {
		firstName: '1',
		secondName: '1',
		mobilePhone: '1',
		password: '1',
		isAdmin: false,
		id: '0',
		email: 'test@test.test',
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [UserFacadeService, provideMockStore({ initialState })],
		});
		userFacadeService = TestBed.inject(UserFacadeService);
		mockStore = TestBed.inject(MockStore);
		mockUserSelector = mockStore.overrideSelector(selectUser, user);
		userFacadeService.getUserFromAuth();
		userFacadeService.updateUser(userUpdate);
	});

	it('should return user', (done: Function) => {
		userFacadeService.user$.pipe(first()).subscribe((result: EntityWrapper<User>) => {
			expect(result).toEqual(user);
			done();
		});
	});
});
