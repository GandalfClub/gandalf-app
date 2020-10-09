import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { Localization } from '../../models/localization';
import { Claim } from '../../models/claim';
import { ContainerFacadeService } from '../../services/container.facade';
import { LocalizationService } from '../../services/localization.service';
import { ButtonComponent } from 'src/app/libs/common-components/components/button/button.component';
import { AdminLink } from '../../models/admin-link';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

	public outlinedButtonType: ButtonType = ButtonType.Outlined;
	public flatButtonType: ButtonType = ButtonType.Flat;

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	public user: User;

	public adminLinksActivation: Map<AdminLink, boolean> = new Map([
		[AdminLink.Events, true],
		[AdminLink.Administration, false]
	]);

	public unsubscribe$: Subject<boolean> = new Subject<boolean>();

	public get userName(): string {
		if (this.user?.firstName.replace(/\s/g, '').length > 0 || this.user?.secondName.replace(/\s/g, '').length > 0) {
			return `${this.user?.firstName} ${this.user?.secondName}`;
		} else {
			return this.user.email;
		}
	}

	public get localization(): Localization {
		return this.localizationService.currentLocalization;
	}

	public get isUnauthorizedUser(): boolean {
		return this.user === undefined;
	}

	public get isAdminUser(): boolean {
		return this.user ? this.user.claims?.includes(Claim.Admin) : false;
	}

	public get isEventManagerUser(): boolean {
		return this.user ? this.user.claims?.includes(Claim.EventManager) : false;
	}

	constructor(public containerFacadeService: ContainerFacadeService, public localizationService: LocalizationService) {}

	public ngOnInit(): void {
		this.containerFacadeService.user$
		.pipe(takeUntil(this.unsubscribe$))
		.subscribe((entity: EntityWrapper<User>) => {
			this.user = entity.value;
		});
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.complete();
	}

	public onEventsClick(): void {
		this.resetAdminLinksActivation();
		this.adminLinksActivation.set(AdminLink.Events, true);
	}

	public onAdministrationClick(): void {
		this.resetAdminLinksActivation();
		this.adminLinksActivation.set(AdminLink.Administration, true);
	}

	private resetAdminLinksActivation(): void {
		this.adminLinksActivation.forEach((activationState: boolean, linkKey: AdminLink) => {
			this.adminLinksActivation.set(linkKey, false);
		});
	}
}
