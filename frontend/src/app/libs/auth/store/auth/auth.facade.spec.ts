import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFacadeService } from './auth.facade';
import { AuthState } from '../../models/auth-state';
import { EntityWrapper } from '../../models/entity-wraper';
import { User } from '../../models/user';
import { EntityStatus } from '../../models/entity-status';
import { first } from 'rxjs/operators';
import { selectUser } from './auth.selectors';
import { MemoizedSelector } from '@ngrx/store';

describe('Auth.FacadeService', () => {
	let mockStore: MockStore<AuthState>;
	let mockUserSelector: MemoizedSelector<AuthState, EntityWrapper<User>>;
	let authFacadeService: AuthFacadeService;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
	};
	const initialState: AuthState = { user };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [AuthFacadeService, provideMockStore({ initialState })],
		});
		authFacadeService = TestBed.inject(AuthFacadeService);
		mockStore = TestBed.inject(MockStore);
		mockUserSelector = mockStore.overrideSelector(selectUser, user);
	});

	it('should return user', (done: Function) => {
		authFacadeService.user$.pipe(first()).subscribe((result: EntityWrapper<User>) => {
			expect(result).toEqual(user);
			done();
		});
	});
});
