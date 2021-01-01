import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EntityWrapper } from '../auth/models/entity-wraper';
import { EntityStatus } from '../auth/models/entity-status';
import { User } from '../auth/models/user';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { BreadcrumbFacadeService } from '../breadcrumb/store/breadcrumb.facade';
import { ComponentTheme } from '../common-components/shared/component-theme.enum';

@Component({
	selector: 'app-user-config',
	templateUrl: './user-profile-page.component.html',
	styleUrls: ['./user-profile-page.component.scss'],
})
export class UserProfilePageComponent implements OnInit, OnDestroy {
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public profileForm: FormGroup;
	public user: User;
	public url: string | ArrayBuffer = 'assets/images/avatars/avatar-participant.svg';
	@ViewChild('fileUpload', { static: false }) fileUploadInput: ElementRef;
	private destroy$: Subject<boolean> = new Subject<boolean>();

	constructor(private authFacadeService: AuthFacadeService, private formBuilder: FormBuilder,
		public breadcrumbFacadeService: BreadcrumbFacadeService) {
		this.profileForm = formBuilder.group({
			email: [''],
			password: [''],
			mobilePhone: [''],
			firstName: [''],
			secondName: [''],
		});
	}

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('Account Settings');
		this.authFacadeService.loadUser();
		this.authFacadeService.user$
			.pipe(
				filter((user: EntityWrapper<User>) => user.status === EntityStatus.Success),
				takeUntil(this.destroy$)
			)
			.subscribe((user: EntityWrapper<User>) => {
				this.user = user.value;
				this.setValuesToForm();
			});
	}

	public onClickInput(): void {
		const fileUpload: HTMLElement = this.fileUploadInput.nativeElement;
		fileUpload.click();
	}

	public onSelectFile(event: any): void {
		if (event.target.files && event.target.files[0]) {
			const reader: FileReader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (e: any) => {
				this.url = e.target.result;
			};
		}
	}

	public updateUserInfo(): void {
		const updatedUser: User = this.getChangesFromForm();
		this.authFacadeService.updateUser(updatedUser);
	}

	public ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
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
}
