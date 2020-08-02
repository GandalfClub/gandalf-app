import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { UserCredentials } from '../auth/models/user-credentials';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { ActivatedRoute } from '@angular/router';
import { RoutePath } from './models/route-path';
import { ValidatorError } from './models/validator-errors';

@Component({
	selector: 'app-auth-page',
	templateUrl: './auth-page.component.html',
	styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
	private passwordMinLenth: number = 6;
	public registerForm: FormGroup;
	public submitted: boolean = false;
	public hidePassword: boolean = true;
	public userCredential: UserCredentials;
	public validatorError: typeof ValidatorError = ValidatorError;
	public routePath: typeof RoutePath = RoutePath;
	public currentPath: string;

	constructor(private authFacadeService: AuthFacadeService, private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {}

	public ngOnInit(): void {
		this.currentPath = this.activatedRoute.snapshot.routeConfig.path;

		this.registerForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.minLength(this.passwordMinLenth)]],
		});
	}

	public get emailInputErrorMessage(): string {
		if (this.registerFormControl.email.errors.required) {
			return this.validatorError.requredEmail;
		}
		if (this.registerFormControl.email.errors.email) {
			return this.validatorError.wrongEmail;
		}
	}

	public get passwordInputErrorMessage(): string {
		if (this.registerFormControl.password.errors.required) {
			return this.validatorError.requiredPassword;
		}
		if (this.registerFormControl.password.errors) {
			return this.validatorError.passwordMinLength;
		}
	}

	public get registerFormControl(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}

	public submit(): void {
		this.submitted = true;
		this.userCredential = this.registerForm.value;
		if (this.registerForm.valid) {
			if (this.currentPath === this.routePath.signin) {
				this.authFacadeService.signIn(this.userCredential.email, this.userCredential.password);
			}
			if (this.currentPath === this.routePath.signup) {
				this.authFacadeService.signUp(this.userCredential.email, this.userCredential.password);
			}
		}
	}

	public signInByGithub(): void {
		this.authFacadeService.signInByGithub();
	}
}
