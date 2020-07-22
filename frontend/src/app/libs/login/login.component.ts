import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { UserCredentials } from '../auth/models/userCredentials';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	public credentials: UserCredentials = new UserCredentials();
	public getState: Observable<any>;
	public errorMessage: string | null;

	constructor(private authFacadeService: AuthFacadeService) { }

	public ngOnInit(): void { }

	public onSubmit(): void {
		this.authFacadeService.logIn(this.credentials.email, this.credentials.password);
	}

	public loginByGithub(): void {
		this.authFacadeService.loginByGithub();
	}
}
