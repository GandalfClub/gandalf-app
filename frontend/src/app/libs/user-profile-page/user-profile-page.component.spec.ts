import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePageComponent } from './user-profile-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { EntityStatus } from '../auth/models/entity-status';
import { User } from '../auth/models/user';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';

describe('UserProfileComponent', () => {
	const user: EntityWrapper<User> = {
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

	const updateUser: User = {
		firstName: 'test',
		secondName: 'test',
		mobilePhone: 'test',
		id: 'test',
		isAdmin: false,
		email: 'test@test.by',
		password: 'test',
	};

	let component: UserProfilePageComponent;
	let destroy$: Subject<boolean>;
	let userForm: User;
	let fixture: ComponentFixture<UserProfilePageComponent>;
	const mockUserFacadeService: Partial<AuthFacadeService> = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(user);
		},
		updateUser: jasmine.createSpy('updateUser'),
		loadUser: jasmine.createSpy('loaduser'),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [UserProfilePageComponent],
			imports: [ReactiveFormsModule, RouterTestingModule],
			providers: [{ provide: AuthFacadeService, useValue: mockUserFacadeService }, { provide: FormBuilder }],
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
		it('should called', () => {
			expect(mockUserFacadeService.updateUser).toHaveBeenCalledWith(updateUser);
		});
	});

	describe('when ngOnInit', () => {
		beforeEach(() => {
			destroy$ = new Subject<boolean>();
		});

		describe('get auth user', () => {
			beforeEach(() => {
				mockUserFacadeService.user$
					.pipe(
						filter((userWrapper: EntityWrapper<User>) => userWrapper.status === EntityStatus.Success),
						takeUntil(destroy$)
					)
					.subscribe((userAuth: EntityWrapper<User>) => {
						userForm = userAuth.value;
					});
				spyOn<any>(component, 'setValuesToForm').and.stub();
				component.ngOnInit();
			});

			it('loadUser called', () => {
				expect(mockUserFacadeService.loadUser).toHaveBeenCalled();
			});

			it('setValuesToForm called', () => {
				expect(component['setValuesToForm']).toHaveBeenCalled();
			});
		});

		describe('without user', () => {
			beforeEach(() => {
				mockUserFacadeService.user$
					.pipe(
						filter((userWrapper: EntityWrapper<User>) => userWrapper.status === EntityStatus.Success),
						takeUntil(destroy$)
					)
					.subscribe();
				user.status = EntityStatus.Error;
				userForm = null;
				component.ngOnInit();
			});

			it('not set value to the form', () => {
				expect(userForm).toEqual(null);
			});
		});
	});

	beforeEach(() => {
		spyOn(component['destroy$'], 'next');
		spyOn(component['destroy$'], 'complete');
		component.ngOnDestroy();
	});

	it('calls next on destroy', () => {
		expect(component['destroy$'].next).toHaveBeenCalled();
		expect(component['destroy$'].complete).toHaveBeenCalled();
	});
});
