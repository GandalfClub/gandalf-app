import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, OnDestroy {
	private passwordMinLenth: number = 6;
	private destroy$: Subject<boolean> = new Subject<boolean>();
	public signUpFormGroup: FormGroup;
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
				this.router.navigate(['events']);
			}
			if (user.status === EntityStatus.Error) {
				this.authError = user.error;
			}
		});

		this.signUpFormGroup = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(this.passwordMinLenth)]],
		});
	}

	public get emailInputErrorMessage(): string {
		if ((this.signUpFormGroupControl.email.touched || this.submitted) && !this.signUpFormGroupControl.email.valid) {
			const emailInputErrorMessage: string[] = Object.keys(this.signUpFormGroupControl.email.errors);
			return emailInputErrorMessage[0];
		}
		return;
	}

	public get passwordInputErrorMessage(): string {
		if ((this.signUpFormGroupControl.password.touched || this.submitted) && !this.signUpFormGroupControl.password.valid) {
			const passwordInputErrorMessage: string[] = Object.keys(this.signUpFormGroupControl.password.errors);
			return passwordInputErrorMessage[0];
		}
		return;
	}

	public get signUpFormGroupControl(): { [key: string]: AbstractControl } {
		return this.signUpFormGroup.controls;
	}

	public get passwordIconVisibility(): string {
		return this.hidePassword ? IconVisibility.Hidden : IconVisibility.Visible;
	}

	public submit(): void {
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
