import { Component } from '@angular/core';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { AdminLink } from '../../models/admin-link';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public outlinedButtonType: ButtonType = ButtonType.Outlined;
	public flatButtonType: ButtonType = ButtonType.Flat;

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public lightTheme: ComponentTheme = ComponentTheme.Light;

	public adminLinksActivation: Map<AdminLink, boolean> = new Map([
		[AdminLink.Events, true],
		[AdminLink.Administration, false]
	]);

	public get eventsLink(): AdminLink {
		return AdminLink.Events;
	}

	public get administrationLink(): AdminLink {
		return AdminLink.Administration;
	}

	constructor(public translateService: TranslateService, public userService: UserService,
		public dialog: MatDialog, public dialogRef: MatDialogRef<any>) { }

	public createEvent(): void {
	/* 	const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
			width: '250px',
			data: { name: this.name, animal: this.animal }
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');
			this.animal = result;
		}); */
	}

	public onEventsClick(): void {
		this.resetAdminLinksActivation();
		this.adminLinksActivation.set(AdminLink.Events, true);
	}

	public onAdministrationClick(): void {
		this.resetAdminLinksActivation();
		this.adminLinksActivation.set(AdminLink.Administration, true);
	}

	public resetAdminLinksActivation(): void {
		this.adminLinksActivation.forEach((activationState: boolean, linkKey: AdminLink) => {
			this.adminLinksActivation.set(linkKey, false);
		});
	}
}
