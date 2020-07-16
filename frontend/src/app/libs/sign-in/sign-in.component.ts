import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../container/models/user';
import { SessionFacadeService } from '../container/store/session/session.facade';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
	public user: IUser;

	public signIn: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(private sessionService: SessionFacadeService) {}

	public submit(): void {
		this.user = this.signIn.value;
		this.sessionService.signIn(this.user);
	}
}
