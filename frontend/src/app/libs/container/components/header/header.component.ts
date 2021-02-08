import { Component, ViewChild } from '@angular/core';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { AdminLink } from '../../models/admin-link';
import { UserService } from '../../services/user.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NewEventFacadeService } from 'src/app/libs/event-creation/store/newEvent.facade';
import { PopoverComponent } from 'src/app/libs/common-components/components/popover/popover.component';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@ViewChild('templatepopoverlight')
	public popoverTemplate: PopoverComponent;
	public outlinedButtonType: ButtonType = ButtonType.Outlined;
	public flatButtonType: ButtonType = ButtonType.Flat;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public eventTitle: string;
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
		public router: Router, public newEventFacadeService: NewEventFacadeService) { }

	public createEvent(): void {
		this.popoverTemplate.close();
		this.newEventFacadeService.setTitleForNewEvent(this.eventTitle);
		this.router.navigateByUrl('/create-event');
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
