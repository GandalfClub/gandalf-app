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
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { ContainerFacadeService } from '../../container/services/container-facade.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Recaptcha } from '../../recaptcha/models/recaptcha';
import { RecaptchaFacadeService } from '../../recaptcha/store/recaptcha/recaptcha.facade';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { RecaptchaModule } from '../../recaptcha/recaptcha.module';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { TranslateModule } from '@ngx-translate/core';

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
			declarations: [SignInComponent],
			imports: [
				RouterTestingModule,
				ReactiveFormsModule,
				CommonComponentsModule,
				RecaptchaV3Module,
				BrowserAnimationsModule,
				TranslateModule.forRoot(),
			],
			providers: [
				{ provide: AuthFacadeService, useValue: mockAuthFacadeService },
				{ provide: ContainerFacadeService, useValue: containerFacadeService },
				{ provide: RecaptchaFacadeService, useValue: mockRecaptchaFacadeService },
				{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcHvukZAAAAAL5zRwijNVtgSAE4nUqkFKZ7h1Qa' }],
		}).compileComponents();
	}));

	beforeEach(() => {
		spyOn(mockAuthFacadeService, 'signIn').and.stub();
		spyOn(mockAuthFacadeService, 'signInByGithub').and.stub();
		fixture = TestBed.createComponent(SignInComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('when signInByGitHub', () => {
		it('signinByGitHub should call', () => {
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
					user.error = 'error';
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
			form = component.signInFormGroup;
			emailInput = form.controls.email;
			passwordInput = form.controls.password;
		});

		describe('with valid signIn form group', () => {
			beforeEach(() => {
				emailInput.setValue('test@test.by');
				passwordInput.setValue('Qq1$ddddd');
				component.submitted = true;
				component.signInUser();
			});

			it('should call signIn ', () => {
				expect(mockAuthFacadeService.signIn).toHaveBeenCalledWith('test@test.by', 'Qq1$ddddd');
			});
		});

		describe('with invalid signIn form group', () => {
			beforeEach(() => {
				emailInput.setValue('test');
				passwordInput.setValue('123');
				component.submitted = true;
				component.signInUser();
			});

			it('should not call signIn', () => {
				expect(form.controls.valid).toBeFalsy();
			});
		});
	});

	describe('when values were input in signInForm', () => {
		beforeEach(() => {
			form = component.signInFormGroup;
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
				expect(component.emailValidator(emailInput)).toEqual({message: 'ERROR_MESSAGE.EMAIL_ERROR_MESSAGE'});
			});
		});

		describe('with empty email', () => {
			beforeEach(() => {
				component.submitted = true;
				emailInput.setValue('');
			});

			it('the form should be invalid', () => {
				expect(component.emailValidator(emailInput)).toEqual({message: 'ERROR_MESSAGE.EMAIL_ERROR_MESSAGE'});
			});
		});

		describe('with valid password', () => {
			beforeEach(() => {
				passwordInput.setValue('Qq1$ddddd');
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
				expect(component.passwordValidator(passwordInput)).toEqual({message: 'ERROR_MESSAGE.PASSWORD_ERROR_MESSAGE'});
			});
		});

		describe('with empty password', () => {
			beforeEach(() => {
				component.submitted = true;
				passwordInput.setValue('');
			});

			it('the form should be invalid', () => {
				expect(component.passwordValidator(passwordInput)).toEqual({message: 'ERROR_MESSAGE.PASSWORD_ERROR_MESSAGE'});
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
