import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { User } from 'src/app/libs/auth/models/user';

import { UserRoleTileComponent } from './user-role-tile.component';

describe('UserComponent', () => {
	let component: UserRoleTileComponent;
	let fixture: ComponentFixture<UserRoleTileComponent>;
	const user: User = {
		id: 'test',
		firstName: 'John',
		secondName: 'Connor',
		mobilePhone: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
		claims: [],
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserRoleTileComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserRoleTileComponent);
		component = fixture.componentInstance;
		component.user = user;
		component.disabled = false;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when toggle slide switched', () => {
		beforeEach(() => {
			spyOn(component.eventManagerClaimToggled, 'emit');
			const matTogle: MatSlideToggle = fixture.debugElement.nativeElement;
			const event: MatSlideToggleChange = new MatSlideToggleChange(matTogle, true);
			component.toggleEventManagerClaim(true);
		});

		it('calls toggleIsAdminClaim', () => {
			expect(component.eventManagerClaimToggled.emit).toHaveBeenCalledWith(true);
		});
	});
});
