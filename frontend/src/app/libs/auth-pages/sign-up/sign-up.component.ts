import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserCredentials } from '../../auth/models/user-credentials';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { Router } from '@angular/router';
import { ValidatorError } from '../models/validator-errors';
import { EntityStatus } from '../../auth/models/entity-status';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../auth/models/user';
import { VisibilityIcon } from '../models/visibility-icon';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
	private passwordMinLenth: number = 6;
	private destroy: Subject<boolean> = new Subject<boolean>();
	public registerForm: FormGroup;
	public submitted: boolean = false;
	public hidePassword: boolean = true;
	public userCredential: UserCredentials;
	public user$: Observable<User>;
	public isLoading: boolean = false;

	constructor(private authFacadeService: AuthFacadeService, private formBuilder: FormBuilder, private router: Router) {}

	public ngOnInit(): void {
		this.authFacadeService.status$.pipe(takeUntil(this.destroy)).subscribe((authState: string) => {
			this.isLoading = authState === EntityStatus.Pending;
			if (authState === EntityStatus.Success) {
				this.router.navigate(['/']);
			}
			if (authState === EntityStatus.Error) {
				this.user$ = this.authFacadeService.user$.pipe();
			}
		});

		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(this.passwordMinLenth)]],
		});
	}

	public get emailInputErrorMessage(): string {
		if (this.registerFormControl.email.errors.required) {
			return ValidatorError.RequredEmail;
		}
		if (this.registerFormControl.email.errors.email) {
			return ValidatorError.WrongEmail;
		}
	}

	public get passwordInputErrorMessage(): string {
		if (this.registerFormControl.password.errors.required) {
			return ValidatorError.RequiredPassword;
		}
		if (this.registerFormControl.password.errors) {
			return ValidatorError.PasswordMinLength;
		}
	}

	public get registerFormControl(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}

	public get passwordVisibilityIcon(): string {
		return this.hidePassword ? VisibilityIcon.VisibilityOff : VisibilityIcon.VisibilityOn;
	}

	public submit(): void {
		this.submitted = true;
		this.userCredential = this.registerForm.value;
		if (this.registerForm.valid) {
			this.authFacadeService.signUp(this.userCredential.email, this.userCredential.password);
		}
	}

	public ngOnDestroy(): void {
		this.destroy.next(true);
		this.destroy.complete();
	}
}
