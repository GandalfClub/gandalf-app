import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePageComponent } from './user-profile-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { UserFacadeService } from './store/user/user.facade';
import { IUser } from './model/user';
import { takeUntil } from 'rxjs/operators';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { EntityStatus } from '../auth/models/entity-status';

describe('UserProfileComponent', () => {
	const user: EntityWrapper<IUser> = {
		status: EntityStatus.Success,
		value: {
			email: 'test@test.by',
			password: 'test',
			firstName: 'test',
			secondName: 'test',
			mobilePhone: 'test',
			id: 'test',
			isAdmin: false,
		},
	};

	const updateUser: any = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		_id: 'test',
	};

	let component: UserProfilePageComponent;
	let destroy$: Subject<boolean>;
	let userForm: IUser;
	let fixture: ComponentFixture<UserProfilePageComponent>;
	const mockUserFacadeService: any = {
		get user$(): any {
			return of(user);
		},
		getUserFromAuth(): any {
			return {};
		},
		updateUser: jasmine.createSpy('updateUser'),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfilePageComponent],
			imports: [ReactiveFormsModule, RouterTestingModule],
			providers: [{ provide: UserFacadeService, useValue: mockUserFacadeService }, { provide: FormBuilder }],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(UserProfilePageComponent);
		component = fixture.componentInstance;
		user.status = EntityStatus.Success;
		userForm = user.value;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('submit', () => {
		beforeEach(() => {
			component.updateUserInfo();
		});
		it('should redirect', () => {
			expect(mockUserFacadeService.updateUser).toHaveBeenCalledWith(updateUser);
		});
	});

	describe('when ngOnInit', () => {
		beforeEach(() => {
			destroy$ = new Subject<boolean>();
		});

		describe('get auth user', () => {
			beforeEach(() => {
				mockUserFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((users: any) => {
					userForm = users.value;
				});
				spyOn<any>(component, 'setValuesToForm').and.stub();
				component.ngOnInit();
			});

			it('setValuesToForm called', () => {
				expect(component['setValuesToForm']).toHaveBeenCalled();
			});
		});

		describe('without user', () => {
			beforeEach(() => {
				mockUserFacadeService.user$.pipe(takeUntil(destroy$)).subscribe();
				user.status = EntityStatus.Error;
				userForm = null;
				component.ngOnInit();
			});

			it('not set value to the form', () => {
				expect(userForm).toEqual(null);
			});
		});
	});

	describe('redirect', () => {
		beforeEach(() => {
			spyOn(component['router'], 'navigate');
			component.backFromUserProfilePage();
		});
		it('should redirect', () => {
			expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
		});
	});

	describe('backFromUserProfilePage', () => {
		beforeEach(() => {
			spyOn(component as any, 'navigateFromUserProfile').and.callThrough();
			component.backFromUserProfilePage();
		});
		it('calls redirect', () => {
			expect(component['navigateFromUserProfile']).toHaveBeenCalled();
		});
	});

	beforeEach(() => {
		spyOn(component['destroySource'], 'next');
		spyOn(component['destroySource'], 'complete');
		component.ngOnDestroy();
	});

	it('calls next on destroySource', () => {
		expect(component['destroySource'].next).toHaveBeenCalled();
		expect(component['destroySource'].complete).toHaveBeenCalled();
	});
});
