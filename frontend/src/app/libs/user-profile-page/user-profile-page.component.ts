import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { EntityStatus } from '../auth/models/entity-status';
import { User } from '../auth/models/user';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';

@Component({
	selector: 'app-user-config',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
	private destroy$: Subject<boolean> = new Subject<boolean>();
	public profileForm: FormGroup;
	public user: User;

	constructor(private authFacadeService: AuthFacadeService, private router: Router, private formBuilder: FormBuilder) {
		this.profileForm = formBuilder.group({
			email: [''],
			password: [''],
			mobilePhone: [''],
			firstName: [''],
			secondName: [''],
		});
	}

	private setValuesToForm(): void {
		this.profileForm.setValue({
			email: this.user.email,
			password: this.user.password,
			firstName: this.user.firstName,
			secondName: this.user.secondName,
			mobilePhone: this.user.mobilePhone,
		});
	}

	private getChangesFromForm(): User {
		const valuesFromForm: User = {
			...this.user,
			id: this.user.id,
			isAdmin: this.user.isAdmin,
			email: this.profileForm.value.email,
			password: this.profileForm.value.password,
			firstName: this.profileForm.value.firstName,
			secondName: this.profileForm.value.secondName,
			mobilePhone: this.profileForm.value.mobilePhone,
		};
		return valuesFromForm;
	}

	public ngOnInit(): void {
		this.authFacadeService.user$.pipe(takeUntil(this.destroy$)).subscribe((user: EntityWrapper<User>) => {
			if (user.status === EntityStatus.Success) {
				this.user = user.value;
			}
			if (this.user !== null) {
				this.setValuesToForm();
			}
		});
	}

	public updateUserInfo(): void {
		const updatedUser: User = this.getChangesFromForm();
		this.authFacadeService.updateUser(updatedUser);
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
