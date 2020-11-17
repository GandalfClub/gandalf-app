import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { UserClaim } from '../../admin-role-management/models/user-claims.enum';
import { EntityStatus } from '../../auth/models/entity-status';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { Route, UrlSegment } from '@angular/router';
import { AdminPanelGuard } from './admin-panel.guard';

describe('AdminPanelGuard', () => {
	let guard: AdminPanelGuard;

	const path: string = '/';
	const fakeRoute: Route = { path };
	const fakeUrlSegment: UrlSegment = { path } as UrlSegment;

	const userIsAdmin: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '1',
			firstName: 'Uladzimir',
			secondName: 'Svirydzenka',
			photoUrl: '',
			email: '1@1.com',
			isAdmin: true,
			claims: [UserClaim.Admin],
		}
	};
	const userIsNotAdmin: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: {
			id: '1',
			firstName: 'Uladzimir',
			secondName: 'Svirydzenka',
			photoUrl: '',
			email: '1@1.com',
			isAdmin: false,
			claims: [UserClaim.Admin],
		}
	};

	let currentUser: EntityWrapper<User>;

	const mockAuthFacadeService: any = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(currentUser);
		},
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [

			],
			providers: [
				{provide: AuthFacadeService, useValue: mockAuthFacadeService}
			]
		});
		guard = TestBed.inject(AdminPanelGuard);
	});

	it('should be created', () => {
		expect(guard).toBeTruthy();
	});

	describe('when canLoad launching with user which is not an admin', () => {

		beforeEach(() => {
			currentUser = userIsNotAdmin;
		});

		it('should return promise with false value', () => {

			guard.canLoad(fakeRoute, [fakeUrlSegment]).then((state: boolean) => expect(state).toBeFalse());
		});
	});

	describe('when canLoad launching with user which is an admin', () => {

		beforeEach(() => {
			currentUser = userIsAdmin;
		});

		it('should return promise with true value', () => {
			guard.canLoad(fakeRoute, [fakeUrlSegment]).then((state: boolean) => expect(state).toBeTrue());
		});
	});
});
