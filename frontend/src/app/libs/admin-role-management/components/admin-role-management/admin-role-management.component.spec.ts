import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleManagementComponent } from './admin-role-management.component';
import { UsersFacadeService } from '../../store/users/users.facade';

describe('AdminRoleManagementComponent', () => {
	let component: AdminRoleManagementComponent;
	let fixture: ComponentFixture<AdminRoleManagementComponent>;
	const mockUsersFacadeService: any = {
		loadUsers(): void {
			return;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AdminRoleManagementComponent],
			providers: [{ provide: UsersFacadeService, useValue: mockUsersFacadeService }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AdminRoleManagementComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
