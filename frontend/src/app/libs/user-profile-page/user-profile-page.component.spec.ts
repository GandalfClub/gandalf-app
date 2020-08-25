import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfilePageComponent } from './user-profile-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {of, Subject} from 'rxjs';
import { UserFacadeService } from './store/user/user.facade';
import {Wrapper} from './model/wraper';
import {IUser} from './model/user';
import {takeUntil} from 'rxjs/operators';

describe('UserProfileComponent', () => {

  const user: Wrapper<IUser> = {
	  status: true,
	  value: {
		  email: 'test@test.by',
		  password: 'test',
		  firstName: 'test',
		  secondName: 'test',
		  mobilePhone: 'test',
	  	_id: 'test',
	  	isAdmin: false,
	}
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
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

  describe('when ngOnInit', () => {
	beforeEach(() => {
		destroy$ = new Subject<boolean>();
	});

	describe('get auth user', () => {
		beforeEach(() => {
		mockUserFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((_: Wrapper<IUser>) => {
			userForm = user.value;
		 	 spyOn<any>(component, 'setValuesToForm').and.callThrough();
		});
		component.ngOnInit();
		});

		it('setValuesToForm called', () => {
	  	expect(component['setValuesToForm']).toHaveBeenCalled();
	});
	 });
  });

  // describe('redirect', () => {
	// beforeEach(() => {
	//  	spyOn(component as any, 'navigateFromUserProfile').and.callThrough();
	// });
	// it('should redirect', () => {
	// 	expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
	// });
  // });

  describe('backFromUserProfilePage', () => {
	beforeEach(() => {
		spyOn(component as any, 'navigateFromUserProfile').and.callThrough();
		component.backFromUserProfilePage();
	});
	it('calls redirect', () => {
		expect(component['navigateFromUserProfile']).toHaveBeenCalled();
	});
  });

  //
  // describe('when ngOnDestroy called', () => {
	// beforeEach(() => {
	// 	spyOn(component['destroy$'], 'next');
	// 	spyOn(component['destroy$'], 'complete');
	// 	component.ngOnDestroy();
	// });
  //
	// it('calls next on destroy$', () => {
	// 	expect(component['destroy$'].next).toHaveBeenCalled();
	// 	expect(component['destroy$'].complete).toHaveBeenCalled();
	// });
  // });

});
