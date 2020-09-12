import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, of } from 'rxjs';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { UsersFacadeService } from '../../store/users/users.facade';

import { UsersRoleManagementPanelComponent } from './users-role-management-panel.component';

@Component({
	selector: 'app-user',
	template: `<div class="app-user__slide-toggle">
		<span>Event Manager </span>
		<mat-slide-toggle [ngModel]="userEventManagerState" [disabled]="userUpdateIsDisabled" (change)="toggleIsAdminClaim($event)">
		</mat-slide-toggle>
	</div>`,
})
class MockUserComponent {
	@Output() public isEventManager: EventEmitter<boolean> = new EventEmitter<boolean>();

	public toggleIsAdminClaim(event: MatSlideToggleChange): void {
		this.isEventManager.emit(event.checked);
	}
}

describe('UserListComponent', () => {
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
	const users: EntityWrapper<User[]> = {
		status: EntityStatus.Success,
		value: [updateUser],
	};
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
		value: updateUser,
	};
	let component: UsersRoleManagementPanelComponent;
	let userComponent: MockUserComponent;
	let fixture: ComponentFixture<UsersRoleManagementPanelComponent>;
	let fixtureUser: ComponentFixture<MockUserComponent>;
	const mockUsersFacadeService: Partial<UsersFacadeService> = {
		get users$(): Observable<EntityWrapper<User[]>> {
			return of(users);
		},
	};

	const mockAuthFacadeService: Partial<AuthFacadeService> = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(user);
		},
		updateUser: jasmine.createSpy('updateUser'),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UsersRoleManagementPanelComponent, MockUserComponent],
			providers: [
				{ provide: UsersFacadeService, useValue: mockUsersFacadeService },
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				ChangeDetectorRef,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UsersRoleManagementPanelComponent);
		fixtureUser = TestBed.createComponent(MockUserComponent);
		component = fixture.componentInstance;
		userComponent = fixtureUser.componentInstance;
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

	describe('when user status pending', () => {
		beforeEach(() => {
			component.userUpdateCurrentState = EntityStatus.Pending;
			spyOn(component, 'userUpdateState').and.callThrough();
		});
		it('method userUpdateState should return true', () => {
			expect(component.userUpdateState(component.userUpdateCurrentState)).toBeTrue();
		});
	});

	describe('', () => {
		beforeEach(() => {
			spyOn(userComponent.isEventManager, 'emit');
			const matTogle: MatSlideToggle = fixture.debugElement.nativeElement;
			const event: MatSlideToggleChange = new MatSlideToggleChange(matTogle, true);
			userComponent.toggleIsAdminClaim(event);
			component.changeUserState(true, user.value);
			fixture.detectChanges();
		});
		it('', () => {
			// expect().toHaveBeenCalled();
		});
	});
});
