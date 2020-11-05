import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { RowToggleOutput } from 'src/app/libs/common-components/components/table/models/row-toggle-output.enum';
import { UserClaim } from '../../models/user-claims.enum';
import { UserSearchService } from '../../services/user-search.service';
import { UsersFacadeService } from '../../store/users/users.facade';

import { UsersRoleManagementPanelComponent } from './users-role-management-panel.component';

describe('UserRoleManagementComponent', () => {
	let component: UsersRoleManagementPanelComponent;
	let fixture: ComponentFixture<UsersRoleManagementPanelComponent>;

	const updateUser: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	const updateUserEventManager: RowToggleOutput<User> = {
		state: false,
		row: {
			firstName: 'test',
			secondName: 'test',
			mobilePhone: 'test',
			id: 'test',
			isAdmin: false,
			email: 'test@test.by',
			claims: [UserClaim.EventManager],
		}
	};

	const updateUserNotEventManager: RowToggleOutput<User> = {
		state: true,
		row: {
			firstName: 'test',
			secondName: 'test',
			mobilePhone: 'test',
			id: 'test',
			isAdmin: false,
			email: 'test@test.by',
			claims: [],
		}
	};

	const users: EntityWrapper<User[]> = {
		status: EntityStatus.Success,
		value: [updateUser],
	};

	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: updateUser,
	};

	const mockUsersFacadeService: Partial<UsersFacadeService> = {
		get users$(): Observable<EntityWrapper<User[]>> {
			return of(users);
		},
		toggleEventManagerClaim(selectedUser: User): User {
			return selectedUser;
		}
	};

	const mockAuthFacadeService: Partial<AuthFacadeService> = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(user);
		},
		updateUser: jasmine.createSpy('updateUser').and.callThrough(),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UsersRoleManagementPanelComponent],
			providers: [
				{ provide: UsersFacadeService, useValue: mockUsersFacadeService },
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				UserSearchService,
			],
		}).compileComponents();

	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UsersRoleManagementPanelComponent);
		component = fixture.componentInstance;

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when event set user event manager emited', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'toggleEventManagerClaim');
			component.toggleEventManagerClaim(updateUserNotEventManager);
		});

		it('should update user state', () => {
			expect(mockUsersFacadeService.toggleEventManagerClaim).toHaveBeenCalledWith(updateUserEventManager.row);
		});
	});
	describe('when event clear user event manager status emited', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'toggleEventManagerClaim');
			component.toggleEventManagerClaim(updateUserEventManager);

		});

		it('should update user state', () => {
			expect(mockUsersFacadeService.toggleEventManagerClaim).toHaveBeenCalledWith(updateUserNotEventManager.row);
		});
	});

});
