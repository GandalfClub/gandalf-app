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
	public errorMessage: Observable<string> | null;
	public isAuthenticated: Observable<boolean>;

	constructor(private authFacadeService: AuthFacadeService) { }

	public ngOnInit(): void {
		this.errorMessage = this.authFacadeService.errorMessage$;
		this.isAuthenticated = this.authFacadeService.isAuthenticated$;
	}

	public onSubmit(): void {
		this.authFacadeService.logIn(this.credentials.email, this.credentials.password);
	}

	public loginByGithub(): void {
		this.authFacadeService.loginByGithub();
	}
}
