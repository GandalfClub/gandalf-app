import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { first } from 'rxjs/operators';
import { AuthState } from '../../auth/models/auth-state';
import { EntityStatus } from '../../auth/models/entity-status';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { selectUser } from '../../auth/store/auth/auth.selectors';
import { ContainerStoreModule } from '../store/store.module';
import { ContainerFacadeService } from './container-facade.service';

describe('ContainerFacadeService', () => {
	let mockStore: MockStore<AuthState>;
	let mockUserSelector: MemoizedSelector<AuthState, EntityWrapper<User>>;
	let containerFacadeService: ContainerFacadeService;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
	};
	const initialState: AuthState = { user };

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ AuthFacadeService, provideMockStore({ initialState }) ],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			]
		});
		containerFacadeService = TestBed.inject(ContainerFacadeService);
		mockStore = TestBed.inject(MockStore);
		mockUserSelector = mockStore.overrideSelector(selectUser, user);
	});

	it('should be created', () => {
		expect(containerFacadeService).toBeTruthy();
	});

	describe('when call signOut', () => {
		it('should call signOut method of authFacadeService', () => {
			spyOn(containerFacadeService, 'signOut');
			containerFacadeService.signOut();
			expect(containerFacadeService.signOut).toHaveBeenCalled();
		});
	});

	describe('when call user$', () => {
		it('should return user', (done: Function) => {
			containerFacadeService.user$.pipe(first()).subscribe((result: EntityWrapper<User>) => {
				expect(result).toEqual(user);
				done();
			});
		});
	});
});
