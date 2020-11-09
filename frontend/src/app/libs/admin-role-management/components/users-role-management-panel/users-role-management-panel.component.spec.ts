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

	const testUser: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	const testUser1: User = {
		firstName: 'test 1',
		secondName: 'test 1',
		mobilePhone: 'test 1',
		id: 'test 1',
		isAdmin: false,
		email: 'test_1@test.by',
		password: 'test1',
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

	const entityUsers: EntityWrapper<User[]> = {
		status: EntityStatus.Success,
		value: [testUser, testUser1],
	};

	const entityUser: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: testUser,
	};

	const selectedUsers: User[] = [
		testUser, testUser1
	];

	const mockUsersFacadeService: Partial<UsersFacadeService> = {
		get users$(): Observable<EntityWrapper<User[]>> {
			return of(entityUsers);
		},
		toggleEventManagerClaim(selectedUser: User): User {
			return selectedUser;
		},
		removeSelectedUsers(selectedUsersId: string[]): void {}
	};

	const mockAuthFacadeService: Partial<AuthFacadeService> = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(entityUser);
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

	describe('when event set user event manager emitted', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'toggleEventManagerClaim');
			component.toggleEventManagerClaim(updateUserNotEventManager);
		});

		it('should update user state', () => {
			expect(mockUsersFacadeService.toggleEventManagerClaim).toHaveBeenCalledWith(updateUserEventManager.row);
		});
	});

	describe('when event clear user event manager status emitted', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'toggleEventManagerClaim');
			component.toggleEventManagerClaim(updateUserEventManager);

		});

		it('should update user state', () => {
			expect(mockUsersFacadeService.toggleEventManagerClaim).toHaveBeenCalledWith(updateUserNotEventManager.row);
		});
	});

	describe('when onHeaderButtonClick method called', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'removeSelectedUsers');
			component.onHeaderButtonClick(selectedUsers);

		});

		it('should change state of isSelectedUsersRemoving to true', () => {
			expect(component.isSelectedUsersRemoving).toBeTrue();
		});

		it('should update user state', () => {
			expect(mockUsersFacadeService.removeSelectedUsers).toHaveBeenCalledWith([testUser.id, testUser1.id]);
		});
	});

	describe('when onInit called', () => {
		beforeEach(() => {
			spyOn(mockUsersFacadeService, 'removeSelectedUsers');
			spyOnProperty(mockAuthFacadeService, 'user$').and.returnValue(of(entityUser));
			component.ngOnInit();
		});

		it('should change usersRequestStatus to Success', () => {
			expect(component.usersRequestStatus).toBe(EntityStatus.Success);
		});

		it('should update users array for rendering', () => {
			expect(component.users).toEqual([{...testUser, isEventManager: false}, {...testUser1, isEventManager: false}]);
		});

		beforeEach(() => {
			const mockTable: any = jasmine.createSpyObj('table', ['clearSelectedRows']);
			component.tableComponent = mockTable;
			component.isSelectedUsersRemoving = true;
			component.ngOnInit();
		});

		it('should call clearSelectedRows method', () => {
			expect(component.tableComponent.clearSelectedRows).toHaveBeenCalled();
		});

		it('should clear selectedUser', () => {
			expect(component.selectedUsers.length).toBe(0);
		});
		it('should turn state of isSelectedUsersRemoving to false', () => {
			expect(component.isSelectedUsersRemoving).toBeFalse();
		});
	});

});
