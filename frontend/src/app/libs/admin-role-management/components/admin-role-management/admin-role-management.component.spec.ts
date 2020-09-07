import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoleManagementComponent } from './admin-role-management.component';

describe('AdminRoleManagementComponent', () => {
	let component: AdminRoleManagementComponent;
	let fixture: ComponentFixture<AdminRoleManagementComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AdminRoleManagementComponent],
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
