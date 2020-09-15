import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { UsersFacadeService } from '../../store/users/users.facade';

import { UsersRoleManagementPanelComponent } from './users-role-management-panel.component';

describe('UserListComponent', () => {
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

	const updateUserEventManage: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		claims: ['EventManager'],
	};

	const updateUserNotEventManage: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		claims: [],
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
				ChangeDetectorRef,
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

	describe('when user status pending', () => {
		beforeEach(() => {
			component.userUpdateCurrentState = EntityStatus.Pending;
			spyOn(component, 'userUpdateState').and.callThrough();
		});
		it('method userUpdateState should return true', () => {
			expect(component.userUpdateState(component.userUpdateCurrentState)).toBeTrue();
		});
	});

	describe('when event set user event manager emited', () => {
		beforeEach(() => {
			component.changeUserState(true, updateUserNotEventManage);
		});

		it('should update user state', () => {
			expect(mockAuthFacadeService.updateUser).toHaveBeenCalledWith(updateUserEventManage);
		});
	});

	describe('when event clear user event manager status emited', () => {
		beforeEach(() => {
			component.changeUserState(false, updateUserEventManage);
		});

		it('should update user state', () => {
			expect(mockAuthFacadeService.updateUser).toHaveBeenCalledWith(updateUserNotEventManage);
		});
	});
});
