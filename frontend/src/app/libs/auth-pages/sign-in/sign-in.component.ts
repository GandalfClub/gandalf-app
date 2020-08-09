import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserCredentials } from '../../auth/models/user-credentials';
import { AuthFacadeService } from '../../auth/store/auth/auth.facade';
import { Router } from '@angular/router';
import { EntityStatus } from '../../auth/models/entity-status';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../auth/models/user';
import { IconVisibility } from '../models/icon-visibility';
import { EntityWrapper } from '../../auth/models/entity-wraper';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
	private passwordMinLenth: number = 6;
	private destroy$: Subject<boolean> = new Subject<boolean>();
	public signInFormGroup: FormGroup;
	public submitted: boolean = false;
	public hidePassword: boolean = true;
	public userCredential: UserCredentials;
	public authError: string;
	public isLoading: boolean = false;

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

		this.signInFormGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(this.passwordMinLenth)]],
		});
	}

	public get emailInputErrorMessage(): string {
		if ((this.signInFormGroupControl.email.touched || this.submitted) && !this.signInFormGroupControl.email.valid) {
			for (const [key, _] of Object.entries(this.signInFormGroupControl.email.errors)) {
				return key;
			}
		}
	}

	public get passwordInputErrorMessage(): string {
		if ((this.signInFormGroupControl.password.touched || this.submitted) && !this.signInFormGroupControl.password.valid) {
			for (const [key, _] of Object.entries(this.signInFormGroupControl.password.errors)) {
				return key;
			}
		}
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
