import { Component } from '@angular/core';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { AdminLink } from '../../models/admin-link';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ContainerFacadeService } from '../../services/container-facade.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

	public outlinedButtonType: ButtonType = ButtonType.Outlined;
	public flatButtonType: ButtonType = ButtonType.Flat;

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

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

	constructor(public translateService: TranslateService, public userService: UserService) { }

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
