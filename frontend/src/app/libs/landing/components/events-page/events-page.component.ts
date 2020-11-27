import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UsersFacadeService } from 'src/app/libs/admin-role-management/store/users/users.facade';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EventCard } from '../../models/event';
import { EventsFacadeService } from '../../store/events/events.facade';

@Component({
	selector: 'app-landing-page',
	templateUrl: './events-page.component.html',
	styleUrls: ['./events-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {

	public events: EntityWrapper<EventCard[]>;

	public user: EntityWrapper<User>;

	public pendingStatus: EntityStatus = EntityStatus.Pending;
	public successStatus: EntityStatus = EntityStatus.Success;

	private destroy$: Subject<any> = new Subject();

	constructor(
		private eventsFacadeService: EventsFacadeService,
		private authFacadeService: AuthFacadeService
		) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();

		this.eventsFacadeService.events$.pipe(takeUntil(this.destroy$))
		.subscribe((events: EntityWrapper<EventCard[]>) => {
			this.events = events;
		});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$))
		.subscribe((user: EntityWrapper<User>) => {
			this.user = user;
		});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
