import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFacadeService } from './store/user/user.facade';
import { IUser } from './model/user';
import { Router } from '@angular/router';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { EntityStatus } from '../auth/models/entity-status';

@Component({
	selector: 'app-user-config',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
	private destroySource: Subject<boolean> = new Subject<boolean>();
	public profileForm: FormGroup;
	public userForm: IUser;

	constructor(private userFacadeService: UserFacadeService, private router: Router, private formBuilder: FormBuilder) {
		this.profileForm = formBuilder.group({
			email: [''],
			password: [''],
			mobilePhone: [''],
			firstName: [''],
			secondName: [''],
		});
	}

	private navigateFromUserProfile(): void {
		this.router.navigate(['/']);
	}

	private setValuesToForm(): void {
		this.profileForm.setValue({
			email: this.userForm.email,
			password: this.userForm.password,
			firstName: this.userForm.firstName,
			secondName: this.userForm.secondName,
			mobilePhone: this.userForm.mobilePhone,
		});
	}

	private createChangedUser(value: any): any {
		const valuesFromForm: any = {
			email: value.email,
			password: value.password,
			firstName: value.firstName,
			secondName: value.secondName,
			mobilePhone: value.mobilePhone,
		};
		return {
			firstName: valuesFromForm.firstName,
			secondName: valuesFromForm.secondName,
			mobilePhone: valuesFromForm.mobilePhone,
		};
	}

	public ngOnInit(): void {
		this.userFacadeService.getUserFromAuth();
		this.userFacadeService.user$.pipe(takeUntil(this.destroySource)).subscribe((user: EntityWrapper<IUser>) => {
			if (user.status === EntityStatus.Success) {
				this.userForm = user.value;
			}
		});
		if (this.userForm !== null) {
			this.setValuesToForm();
		}
	}

	public updateUserInfo(): void {
		const formValue: any = this.createChangedUser(this.profileForm.value);
		formValue.id = this.userForm.id;
		this.userFacadeService.updateUser(formValue);
		this.userForm = {
			id: '',
			email: '',
			firstName: '',
			secondName: '',
			isAdmin: false,
			mobilePhone: '',
			password: '',
		};
	}

	public ngOnDestroy(): void {
		this.destroySource.next(true);
		this.destroySource.complete();
	}

	public backFromUserProfilePage(): void {
		this.navigateFromUserProfile();
	}
}
