import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
<<<<<<< HEAD
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserFacadeService } from './store/user/user.facade';
import { IUser } from './model/user_';
import { Wrapper } from './model/wraper';
=======
import { UserProfileService } from './service/user-profile-service';
import { ImprovedUser } from './models/improved_user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> e4f01b2... fix(gandalf/frontend): change type

@Component({
	selector: 'app-user-config',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
	private destroySource: Subject<boolean> = new Subject<boolean>();
	public profileForm: FormGroup;
	public userForm: IUser;

	constructor(
		private authFacadeService: AuthFacadeService,
		private userFacadeService: UserFacadeService,
		private formBuilder: FormBuilder
	) {
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
			email: this.userForm.email,
			password: this.userForm.password,
			firstName: this.userForm.firstName,
			secondName: this.userForm.secondName,
			mobilePhone: this.userForm.mobilePhone,
		});
	}

	private createChangedUser(value: any): any {
		return {
			firstName: value.firstName,
			secondName: value.secondName,
			mobilePhone: value.mobilePhone,
		};
	}

	public ngOnInit(): void {
		this.authFacadeService.signInByGithub();

<<<<<<< HEAD
		this.userFacadeService.user$.pipe(takeUntil(this.destroySource)).subscribe((user: Wrapper<IUser>) => {
			if (user.status === true) {
				this.userForm = user.value;
				this.setValuesToForm();
=======
		this.authState = this.authFacadeService.status$.pipe(takeUntil(this.destroySource)).subscribe((authState: string) => {
			if (authState === 'Success') {
				this.authFacadeService.user$.pipe(takeUntil(this.destroySource)).subscribe((authUser: any) => {
					this.userProfileService.getUser(authUser.user.email).subscribe((improvedUser: ImprovedUser) => {
						this.profileForm.setValue(improvedUser);
					});
				});
>>>>>>> e4f01b2... fix(gandalf/frontend): change type
			}
		});
	}

	public submit(): void {
		const formValue: any = this.createChangedUser(this.profileForm.value);
		formValue._id = this.userForm._id;
		this.userFacadeService.updateUser(formValue);
	}

	public ngOnDestroy(): void {
		this.destroySource.next(true);
		this.destroySource.complete();
	}
}
