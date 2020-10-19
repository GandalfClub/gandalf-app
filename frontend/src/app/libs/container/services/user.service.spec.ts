import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { first } from 'rxjs/internal/operators/first';
import { UserClaim } from '../../admin-role-management/models/user-claims.enum';
import { EntityStatus } from '../../auth/models/entity-status';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { ContainerStoreModule } from '../store/store.module';
import { ContainerFacadeService } from './container-facade.service';
import { UserService } from './user.service';

interface FakeContainerFacadeService {
	user$: Observable<EntityWrapper<User>>;
}

describe('UserService', () => {
	let userService: UserService;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '0',
			email: '1@1.com',
			firstName: '1',
			secondName: '2',
			isAdmin: false,
			photoUrl: 'photo.com/url',
			claims: []
		}
	};

	const userAdmin: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '0',
			email: '1@1.com',
			firstName: '1',
			secondName: '2',
			isAdmin: false,
			photoUrl: 'photo.com/url',
			claims: [ UserClaim.Admin ]
		}
	};

	const userManager: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '0',
			email: '1@1.com',
			firstName: 'name',
			secondName: 'name',
			isAdmin: false,
			photoUrl: 'photo.com/url',
			claims: [ UserClaim.EventManager ]
		}
	};

	const userUnauthorized: EntityWrapper<User> = {
		status: EntityStatus.Pending,
		value: undefined
	};

	const fakeContainerFacadeService: FakeContainerFacadeService = {
		user$: of(user)
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ { provide: ContainerFacadeService, useValue: fakeContainerFacadeService} ],
			imports: [
				EffectsModule.forRoot([]),
				StoreModule.forRoot({}),
				ContainerStoreModule
			]
	});
		userService = TestBed.inject(UserService);
		userService.subscribeUser();
	});

	afterEach(() => {
		userService.unsubscribeUser();
		fakeContainerFacadeService.user$ = of(user);
	});

	it('should be created', () => {
		expect(userService).toBeTruthy();
	});

	it('should subscribe on user', (done: Function) => {
		fakeContainerFacadeService.user$.pipe(first()).subscribe((result: EntityWrapper<User>) => {
			expect(result).toEqual(user);
			done();
		});
	});

	describe('when call userFullName', () => {
		it('should return user full name', () => {
			expect(userService.userFullName).toEqual(`${user.value.firstName} ${user.value.secondName}`);
		});
	});

	describe('when call userEmail', () => {
		it('should return user email', () => {
			expect(userService.userEmail).toEqual(user.value.email);
		});
	});

	describe('when call isUnauthorizedUser', () => {
		describe('when user is defined', () => {
			it('should return false', () => {
				expect(userService.isUnauthorizedUser).toBeFalse();
			});
		});

		describe('when user is undefined', () => {
			beforeEach(() => {
				userService.unsubscribeUser();
				fakeContainerFacadeService.user$ = of(userUnauthorized);
				userService.subscribeUser();
			});

			it('should return true', () => {
				expect(userService.isUnauthorizedUser).toBeTrue();
			});
		});
	});

	describe('when call isAdminUser', () => {
		describe('when user is Admin', () => {
			beforeEach(() => {
				userService.unsubscribeUser();
				fakeContainerFacadeService.user$ = of(userAdmin);
				userService.subscribeUser();
			});

			it('should return true', () => {
				expect(userService.isAdminUser).toBeTrue();
			});
		});

		describe('when user is not Admin', () => {
			it('should return false', () => {
				expect(userService.isAdminUser).toBeFalse();
			});
		});
	});

	describe('when call isEventManagerUser', () => {
		describe('when user is EventManager', () => {
			beforeEach(() => {
				userService.unsubscribeUser();
				fakeContainerFacadeService.user$ = of(userManager);
				userService.subscribeUser();
			});

			it('should return true', () => {
				expect(userService.isEventManagerUser).toBeTrue();
			});
		});

		describe('when user is not EventManager', () => {
			it('should return false', () => {
				expect(userService.isEventManagerUser).toBeFalse();
			});
		});
	});

	describe('when call photoUrl', () => {
		it('should return photoUrl', () => {
			expect(userService.photoUrl).toEqual(user.value.photoUrl);
		});
	});
});
