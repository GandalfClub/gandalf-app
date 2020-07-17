import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IUser } from '../container/models/user';
import { SessionFacadeService } from '../container/store/session/session.facade';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
	public user: IUser;
	public hide: boolean = true;

	public signinForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private sessionFacadeService: SessionFacadeService) {}

	public getErrorMessage(): string {
		if (this.signinForm.get('email').hasError('required')) {
			return 'You must enter a value';
		}
		return this.signinForm.get('email').hasError('email')
			? 'Not a valid email'
			: '';
	}

	public submit(): void {
		this.user = this.signinForm.value;
		this.sessionFacadeService.signIn(this.user);
	}
}
