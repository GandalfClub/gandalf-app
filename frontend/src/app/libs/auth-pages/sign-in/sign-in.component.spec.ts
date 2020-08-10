import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { of, Subject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { takeUntil } from 'rxjs/operators';
import { EntityStatus } from '../../auth/models/entity-status';

describe('SignInComponent', () => {
	let component: SignInComponent;
	let form: FormGroup;
	let emailInput: AbstractControl;
	let passwordInput: AbstractControl;
	let destroy$: Subject<boolean>;
	let fixture: ComponentFixture<SignInComponent>;
	const user: EntityWrapper<User> = {
		status: EntityStatus.Success,
	};
	const mockAuthFacadeService: any = {
		get user$(): Observable<EntityWrapper<User>> {
			return of(user);
		},
		signInByGithub(): void {
			user.status = EntityStatus.Pending;
		},
		signIn(): void {
			user.status = EntityStatus.Pending;
		},
		signUp(): void {
			user.status = EntityStatus.Pending;
		},
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignInComponent],
			imports: [RouterTestingModule, ReactiveFormsModule],
			providers: [{ provide: AuthFacadeService, useValue: mockAuthFacadeService }],
		}).compileComponents();
	}));

	beforeEach(() => {
		spyOn(mockAuthFacadeService, 'signIn').and.stub();
		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when signInByGitHub', () => {
		it('signinByGitHub should call', () => {
			spyOn(mockAuthFacadeService, 'signInByGithub').and.stub();
			component.signInByGithub();
			expect(mockAuthFacadeService.signInByGithub).toHaveBeenCalled();
		});
	});

	describe('when hide password button pressed', () => {
		it('change hidePassword', () => {
			component.hidePassword = !component.hidePassword;
			expect(component.passwordIconVisibility).toEqual('visibility');
		});
	});

	describe('when signIn', () => {
		beforeEach(() => {
			destroy$ = new Subject<boolean>();
		});
		it('should redirect with valid credits', () => {
			mockAuthFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((_: EntityWrapper<User>) => {
				user.status = EntityStatus.Success;
			});
			spyOn(component['router'], 'navigate');
			component.ngOnInit();
			expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
		});

		it('should return error with invalid credits', () => {
			user.status = EntityStatus.Error;
			mockAuthFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((_: EntityWrapper<User>) => {
				user.error = 'error';
			});
			component.ngOnInit();
			expect(component.authError).toEqual('error');
		});
	});

	describe('when submit', () => {
		beforeEach(() => {
			form = component.signInFormGroup;
			emailInput = form.controls.email;
			passwordInput = form.controls.password;
		});
		it('should call signIn with valid signIn form group', () => {
			emailInput.setValue('test@test.by');
			passwordInput.setValue('123456');
			component.submitted = true;
			component.submit();
			expect(mockAuthFacadeService.signIn).toHaveBeenCalledWith('test@test.by', '123456');
		});

		it('should not call signIn with invalid signIn form group', () => {
			emailInput.setValue('test');
			passwordInput.setValue('123');
			component.submitted = true;
			component.submit();
			expect(form.controls.valid).toBeFalsy();
		});
	});

	describe('when values were input in signInForm', () => {
		beforeEach(() => {
			form = component.signInFormGroup;
			emailInput = form.controls.email;
			passwordInput = form.controls.password;
		});
		it('the form should be valid with valid email input', () => {
			emailInput.setValue('test@test.by');
			expect(form.controls.email.valid).toBeTruthy();
		});

		it('the form should be invalid with invalid email input', () => {
			component.submitted = true;
			emailInput.setValue('test');
			expect(component.emailInputErrorMessage).toBe('email');
		});

		it('the form should be invalid with empty email input', () => {
			component.submitted = true;
			emailInput.setValue('');
			expect(component.emailInputErrorMessage).toBe('required');
		});

		it('the form should be valid with valid password input', () => {
			passwordInput.setValue('123456');
			expect(form.controls.password.valid).toBeTruthy();
		});

		it('the form should be invalid with invalid password input', () => {
			component.submitted = true;
			passwordInput.setValue('123');
			expect(component.passwordInputErrorMessage).toBe('minlength');
		});

		it('the form should be invalid with empty password', () => {
			component.submitted = true;
			passwordInput.setValue('');
			expect(component.passwordInputErrorMessage).toBe('required');
		});
	});

	describe('when ngOnDestroy called', () => {
		beforeEach(() => {
			spyOn(component['destroy$'], 'next');
			spyOn(component['destroy$'], 'complete');
			component.ngOnDestroy();
		});

		it('calls next on destroy$', () => {
			expect(component['destroy$'].next).toHaveBeenCalled();
			expect(component['destroy$'].complete).toHaveBeenCalled();
		});
	});
});
