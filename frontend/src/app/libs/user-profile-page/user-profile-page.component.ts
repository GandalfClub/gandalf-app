import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { ReplaySubject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserProfileService } from './service/user-profile-service';
import { ImprovedUser } from './models/improved_user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../auth/models/user';

@Component({
	selector: 'app-user-config',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
	private destroySource: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
	public authState: Subscription;
	public profileForm: FormGroup;
	public userForm: ImprovedUser;

	constructor(
		private authFacadeService: AuthFacadeService,
		private userProfileService: UserProfileService,
		private formBuilder: FormBuilder
	) {
		this.profileForm = formBuilder.group({
			email: [''],
			password: [''],
			phone: [''],
			firstName: [''],
			lastName: [''],
		});
	}

	public ngOnInit(): void {
		this.authFacadeService.signInByGithub();

		this.authState = this.authFacadeService.status$.pipe(takeUntil(this.destroySource)).subscribe((authState: string) => {
			if (authState === 'Success') {
				this.authFacadeService.user$.pipe(takeUntil(this.destroySource)).subscribe((authUser: User) => {
					this.userProfileService
						.getUser(authUser.user.email)
						.pipe()
						.subscribe((improvedUser: ImprovedUser) => {
							this.profileForm.setValue(improvedUser);
						});
				});
			}
		});
	}

	public ngOnDestroy(): void {
		this.destroySource.next(true);
		this.destroySource.complete();
	}

	public submit(): void {
		this.userForm = this.profileForm.value;
		this.userProfileService.setUser(this.userForm).subscribe((response: Boolean) => {
			if (response) {
				this.profileForm.setValue({ email: '', password: '', phone: '', firstName: '', lastName: '' });
			}
		});
	}
}
