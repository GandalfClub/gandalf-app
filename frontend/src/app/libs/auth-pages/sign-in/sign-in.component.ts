import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, ValidatorFn, FormControl, ValidationErrors } from '@angular/forms';
import { UserCredentials } from '../../auth/models/user-credentials';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { Router } from '@angular/router';
import { EntityStatus } from '../../auth/models/entity-status';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../auth/models/user';
import { IconVisibility } from '../models/icon-visibility';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { ContainerFacadeService } from '../../container/services/container-facade.service';
import { ComponentTheme } from '../../common-components/shared/component-theme.enum';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public emailValidators: ValidatorFn[] = [this.emailValidator.bind(this)];
	public passwordValidators: ValidatorFn[] = [this.passwordValidator.bind(this)];
	public signInFormGroup: FormGroup;
	public submitted: boolean = false;
	public hidePassword: boolean = true;
	public userCredential: UserCredentials;
	public authError: string;
	public isLoading: boolean = false;
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private translate: TranslateService, private authFacadeService: AuthFacadeService, private formBuilder: FormBuilder,
		private router: Router, private containerFacadService: ContainerFacadeService) {}

	public ngOnInit(): void {
		this.containerFacadService.hideElementOnSignIn();
		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.isLoading = user.status === EntityStatus.Pending;
			if (user.status === EntityStatus.Success) {
				this.router.navigate(['/']);
			}
			if (user.status === EntityStatus.Error) {
				this.authError = user.error;
			}
		});

		this.signInFormGroup = this.formBuilder.group({
			email: '',
			password: '',
		});
	}

	public emailValidator(control: FormControl): ValidationErrors | null {
		const maxLength: number = 128;
		const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (control && Boolean(control.value) && control.value.length >= maxLength ||
			control && Boolean(control.value) && !emailPattern.test(control.value) ||
			!Boolean(control.value)) {
			return { message: this.translate.instant('ERROR_MESSAGE.EMAIL_ERROR_MESSAGE') };
		}
		return null;
	}

	public passwordValidator(control: FormControl): ValidationErrors | null {
		const passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,17}$/;
		if (control && Boolean(control.value) && !passwordPattern.test(control.value) ||
			!Boolean(control.value)) {
			return { message: this.translate.instant('ERROR_MESSAGE.PASSWORD_ERROR_MESSAGE') };
		}
		return null;
	}

	public get signInFormGroupControl(): { [key: string]: AbstractControl } {
		return this.signInFormGroup.controls;
	}

	public get passwordIconVisibility(): string {
		return this.hidePassword ? IconVisibility.Hidden : IconVisibility.Visible;
	}

	public submit(): void {
		this.submitted = true;
		this.userCredential = this.signInFormGroup.value;
		if (this.signInFormGroup.valid) {
			this.authFacadeService.signIn(this.userCredential.email, this.userCredential.password);
		}
	}

	public signInByGithub(): void {
		this.authFacadeService.signInByGithub();
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
