import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import { of, Subject, Observable } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { ContainerFacadeService } from '../../container/services/container-facade.service';
import { RecaptchaFacadeService } from '../../recaptcha/store/recaptcha/recaptcha.facade';
import { ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { Recaptcha } from '../../recaptcha/models/recaptcha';
import { takeUntil } from 'rxjs/operators';
import { EntityStatus } from '../../auth/models/entity-status';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { StoreModule } from '@ngrx/store';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { NgxMaskModule } from 'ngx-mask';

describe('SignUpComponent', () => {
	let component: SignUpComponent;
	let form: FormGroup;
	let emailInput: AbstractControl;
	let passwordInput: AbstractControl;
	let firstNameInput: AbstractControl;
	let secondNameInput: AbstractControl;
	let mobilePhoneInput: AbstractControl;
	let destroy$: Subject<boolean>;
	let fixture: ComponentFixture<SignUpComponent>;
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

	const containerFacadeService: any = {
		hideElementsOnSignIn(): void {
		},
		showElementsOnSignIn(): void {
		}
	};

	const recaptcha: EntityWrapper<Recaptcha> = {
		status: EntityStatus.Success,
	};

	const mockRecaptchaFacadeService: any = {
		get isRecaptchaPassed$(): Observable<EntityWrapper<Recaptcha>> {
			return of(recaptcha);
		},
		getRecaptchaStatus(): void {
			recaptcha.status = EntityStatus.Pending;
		}
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SignUpComponent],
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				CommonComponentsModule,
				BrowserAnimationsModule,
				RecaptchaV3Module,
				StoreModule,
				TranslateModule.forRoot(),
				NgxMaskModule.forRoot()],
			providers: [
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				{ provide: RecaptchaFacadeService, useValue: mockRecaptchaFacadeService },
				{ provide: ContainerFacadeService, useValue: containerFacadeService },
				{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcHvukZAAAAAL5zRwijNVtgSAE4nUqkFKZ7h1Qa' }
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		spyOn(mockAuthFacadeService, 'signUp').and.stub();
		fixture = TestBed.createComponent(SignUpComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when hide password button pressed', () => {
		it('change hidePassword', () => {
			component.hidePassword = !component.hidePassword;
			expect(component.passwordIconVisibility).toEqual('visibility');
		});
	});

	describe('when signUp', () => {
		beforeEach(() => {
			destroy$ = new Subject<boolean>();
		});

		describe('with valid credentials', () => {
			beforeEach(() => {
				mockAuthFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((_: EntityWrapper<User>) => {
					user.status = EntityStatus.Success;
				});
				spyOn(component['router'], 'navigate');
				component.ngOnInit();
			});

			it('should redirect', () => {
				expect(component['router'].navigate).toHaveBeenCalledWith(['/']);
			});
		});

		describe('with invalid credentials', () => {
			beforeEach(() => {
				user.status = EntityStatus.Error;
				mockAuthFacadeService.user$.pipe(takeUntil(destroy$)).subscribe((_: EntityWrapper<User>) => {
					user.error = {
						message: {
							statusText: 'error'
						}
					};
				});
				component.ngOnInit();
			});

			it('should return error', () => {
				expect(component.authError).toEqual('error');
			});
		});
	});

	describe('when submit', () => {
		beforeEach(() => {
			form = component.signUpFormGroup;
			emailInput = form.controls.email;
			passwordInput = form.controls.password;
			firstNameInput = form.controls.firstName;
			secondNameInput = form.controls.secondName;
			mobilePhoneInput = form.controls.mobilePhone;
		});

		describe('with valid signUp form group', () => {
			beforeEach(() => {
				emailInput.setValue('test@test.by');
				passwordInput.setValue('Qq@1qq');
				firstNameInput.setValue('TestFirstName');
				secondNameInput.setValue('TestLastName');
				mobilePhoneInput.setValue('+375291234567');
				component.submitted = true;
				component.signUpUser();
			});

			const userDto: any = {
				firstName: 'TestFirstName',
				secondName: 'TestLastName',
				email: 'test@test.by',
				password: 'Qq@1qq',
				mobilePhone: '+375291234567',
			};

			it('should call signUp ', () => {
				expect(mockAuthFacadeService.signUp).toHaveBeenCalledWith(userDto);
			});
		});

		describe('with invalid signUp form group', () => {
			beforeEach(() => {
				emailInput.setValue('test');
				passwordInput.setValue('123');
				component.submitted = true;
				component.signUpUser();
			});

			it('should not call signUp', () => {
				expect(form.controls.valid).toBeFalsy();
			});
		});
	});

	describe('when values were input in signUpForm', () => {
		beforeEach(() => {
			form = component.signUpFormGroup;
			emailInput = form.controls.email;
			passwordInput = form.controls.password;
		});

		describe('with valid email', () => {
			beforeEach(() => {
				emailInput.setValue('test@test.by');
			});

			it('the form should be valid', () => {
				expect(form.controls.email.valid).toBeTruthy();
			});
		});

		describe('with invalid email', () => {
			beforeEach(() => {
				component.submitted = true;
				emailInput.setValue('test');
			});

			it('the form should be invalid', () => {
				expect(component.emailValidator(emailInput)).toEqual({message: 'Your email have invalid format'});
			});
		});

		describe('with empty email', () => {
			beforeEach(() => {
				component.submitted = true;
				emailInput.setValue('');
			});

			it('the form should be invalid', () => {
				expect(component.requiredValidator(emailInput)).toEqual({message: 'Its required field'});
			});
		});

		describe('with valid password', () => {
			beforeEach(() => {
				passwordInput.setValue('Qq@1qq');
			});

			it('the form should be valid', () => {
				expect(form.controls.password.valid).toBeTruthy();
			});
		});

		describe('with invalid password', () => {
			beforeEach(() => {
				component.submitted = true;
				passwordInput.setValue('123');
			});

			it('the form should be invalid', () => {
				expect(component.passwordValidator(passwordInput)).toEqual({message: 'Password must have length 6-18 symbols, includes digits, symbols, uppercase and lowercase letters'});
			});
		});

		describe('with empty password', () => {
			beforeEach(() => {
				component.submitted = true;
				passwordInput.setValue('');
			});

			it('the form should be invalid', () => {
				expect(component.requiredValidator(passwordInput)).toEqual({message: 'Its required field'});
			});
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
