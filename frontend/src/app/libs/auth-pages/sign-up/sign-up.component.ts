import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserCredentials } from '../../auth/models/user-credentials';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { Router } from '@angular/router';
import { EntityStatus } from '../../auth/models/entity-status';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../auth/models/user';
import { IconVisibility } from '../models/icon-visibility';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
	public signUpFormGroup: FormGroup;
	public submitted: boolean = false;
	public hidePassword: boolean = true;
	public userCredential: UserCredentials;
	public authError: string;
	public isLoading: boolean = false;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public passwordValidators: ValidatorFn[] = [this.passwordValidator, this.requiredValidator];
	public emailValidators: ValidatorFn[] = [this.emailValidator, this.requiredValidator];
	public textSyncValidators: ValidatorFn[] = [this.lengthValidator, this.requiredValidator];
	private passwordMinLenth: number = 6;
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private authFacadeService: AuthFacadeService, private formBuilder: FormBuilder, private router: Router) {}

	public ngOnInit(): void {
		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			this.isLoading = user.status === EntityStatus.Pending;
			if (user.status === EntityStatus.Success) {
				this.router.navigate(['/']);
			}
			if (user.status === EntityStatus.Error) {
				this.authError = user.error;
			}
		});

		this.signUpFormGroup = this.formBuilder.group({
			firstName: [''],
			lastName: [''],
			email: [''],
			password: [''],
			mobilePhone: [''],
		});
	}
	public passwordValidator(control: FormControl): ValidationErrors | null {
		const passwordPatter: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,18}$/;
		if (control && Boolean(control.value) && !passwordPatter.test(control.value)) {
			return {message: `Password must have length 6-18 symbols, includes digits, symbols, uppercase and lowercase letters`};
		}
		return null;
	}
	public requiredValidator(control: FormControl): ValidationErrors | null {
		if (!Boolean(control.value)) {
			return {message: `Its required field`};
		}
		return null;
	}
	public lengthValidator(control: FormControl): ValidationErrors | null {
		const maxLength: number = 65;
		if (control && Boolean(control.value) && control.value.length > maxLength) {
			return {message: 'It should be at less than 64 characters'};
		}
		return null;
	}
	public emailValidator(control: FormControl): ValidationErrors | null {
		const emailPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (control && Boolean(control.value) && !emailPattern.test(control.value)) {
			return {message: `Your email have invalid format`};
		}
		return null;
	}
	// public get emailInputErrorMessage(): string {
	// 	if ((this.signUpFormGroupControl.email.touched || this.submitted) && !this.signUpFormGroupControl.email.valid) {
	// 		const emailInputErrorMessage: string[] = Object.keys(this.signUpFormGroupControl.email.errors);
	// 		return emailInputErrorMessage[0];
	// 	}
	// 	return;
	// }

	// public get passwordInputErrorMessage(): string {
	// 	if ((this.signUpFormGroupControl.password.touched || this.submitted) && !this.signUpFormGroupControl.password.valid) {
	// 		const passwordInputErrorMessage: string[] = Object.keys(this.signUpFormGroupControl.password.errors);
	// 		return passwordInputErrorMessage[0];
	// 	}
	// 	return;
	// }

	// public get signUpFormGroupControl(): { [key: string]: AbstractControl } {
	// 	return this.signUpFormGroup.controls;
	// }

	public get passwordIconVisibility(): string {
		return this.hidePassword ? IconVisibility.Hidden : IconVisibility.Visible;
	}

	public submit(): void {
		console.log(this.signUpFormGroup.valid);
		this.submitted = true;
		this.userCredential = this.signUpFormGroup.value;
		if (this.signUpFormGroup.valid) {
			this.authFacadeService.signUp(this.userCredential.email, this.userCredential.password);
		}
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
