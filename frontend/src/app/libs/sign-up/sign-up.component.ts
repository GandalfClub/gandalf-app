import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserCredentials } from '../auth/models/user-credentials';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
	public userCredentials: UserCredentials;
	public hide: boolean = true;
	public signUpForm: FormGroup;

	constructor() {
		this.signUpForm = new FormGroup({
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required]),
		});
	}

	public getErrorMessage(): string | { false: boolean } {
		if (this.signUpForm.get('email').hasError('required')) {
			return 'You must enter a value';
		}
		return this.signUpForm.get('email').hasError('email') ? 'Not a valid email' : '';
	}

	public submit(): void {
		this.userCredentials = this.signUpForm.value;
		// this.authFacadeService.signUp(this.userCredentials);
	}
}
