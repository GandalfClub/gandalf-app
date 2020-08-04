import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserCredentials } from '../auth/models/user-credentials';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { User } from '../auth/models/user';

@Component({
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	public credentials: UserCredentials = {
		email: null,
		password: null,
	};
	public statusSub: Subscription;
	public status: string;

	constructor(private authFacadeService: AuthFacadeService) {}

	public ngOnInit(): void {
		this.statusSub = this.authFacadeService.user$.subscribe((user: EntityWrapper<User>) => (this.status = user.status));
	}

	public login(): void {
		this.authFacadeService.signIn(this.credentials.email, this.credentials.password);
	}

	public loginByGithub(): void {
		this.authFacadeService.signInByGithub();
	}
}
