import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthFacadeService } from './auth.facade';
import { AuthState } from '../../models/auth-state';
import { EntityWrapper } from '../../models/entity-wraper';
import { User } from '../../models/user';
import { EntityStatus } from '../../models/entity-status';
import { first } from 'rxjs/operators';

describe('Auth.FacadeService', () => {
	let mockStore: MockStore<AuthState>;
	let authFacadeService: AuthFacadeService;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
	};
	const initialState: AuthState = { user };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				AuthFacadeService,
				provideMockStore({ initialState }),
			],
		});
		authFacadeService = TestBed.inject(AuthFacadeService);
		mockStore = TestBed.inject(MockStore);
	});

	it('should return user', () => {
		authFacadeService.user$.pipe(first()).subscribe((result: EntityWrapper<User>) => {
			expect(result).toEqual(user);
		});
	});
});
