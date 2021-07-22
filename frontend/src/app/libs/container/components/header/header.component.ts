import { Component, ViewChild } from '@angular/core';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { AdminLink } from '../../models/admin-link';
import { UserService } from '../../services/user.service';
import { NewEventFacadeService } from 'src/app/libs/event-creation/store/event.facade';
import { PopoverComponent } from 'src/app/libs/common-components/components/popover/popover.component';
import { ProgressBarMode } from 'src/app/libs/common-components/shared/progress-bar-mode.enum';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	@ViewChild('templatepopoverlight') public popoverTemplate: PopoverComponent;
	public outlinedButtonType: ButtonType = ButtonType.Outlined;
	public flatButtonType: ButtonType = ButtonType.Flat;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public eventTitle: string = '';
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	public progressBarMode: string = ProgressBarMode.Indeterminate;
	public isLoading$: Observable<boolean> = this.newEventFacadeService.isEventLoading$;

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

	constructor(
		public userService: UserService,
		public newEventFacadeService: NewEventFacadeService) { }

	public createEvent(): void {
		if (!Boolean(this.eventTitle.length)) { return; }

		this.popoverTemplate.close();
		this.newEventFacadeService.createEvent(this.eventTitle);
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

	public onCreateEvent(): void {
		this.popoverTemplate.open();
	}
}
