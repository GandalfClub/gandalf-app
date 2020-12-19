import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersFacadeService } from 'src/app/libs/admin-role-management/store/users/users.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { Event } from '../../models/event';
import { EventsFacadeService } from '../../store/events/events.facade';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-landing-page',
	templateUrl: './events-page.component.html',
	styleUrls: ['./events-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
	public flatButtonType: ButtonType = ButtonType.Flat;
	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public events: EntityWrapper<Event[]>;

	public user: EntityWrapper<User>;

	public pendingStatus: EntityStatus = EntityStatus.Pending;
	public successStatus: EntityStatus = EntityStatus.Success;

	private destroy$: Subject<any> = new Subject();

	constructor(
		private eventsFacadeService: EventsFacadeService,
		private authFacadeService: AuthFacadeService,
		public translateService: TranslateService,
		public router: Router
	) { }

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();

		this.eventsFacadeService.events$.pipe(takeUntil(this.destroy$))
			.subscribe((events: EntityWrapper<Event[]>) => {
				this.events = events;
			});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$))
			.subscribe((user: EntityWrapper<User>) => {
				this.user = user;
			});
	}
	public goToSignUp(): void {
		this.router.navigateByUrl('/signup')
	}
	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
