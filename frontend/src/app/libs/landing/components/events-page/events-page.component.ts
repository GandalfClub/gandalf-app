import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { pluck, switchMap, takeUntil } from 'rxjs/operators';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { Event } from '../../models/event';
import { EventsFacadeService } from '../../store/events/events.facade';
import { ButtonType } from 'src/app/libs/common-components/components/button/models/button-type.enum';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
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
	public userEvents$: Observable<Event[]>;

	public pendingStatus: EntityStatus = EntityStatus.Pending;
	public successStatus: EntityStatus = EntityStatus.Success;
	public myEvents: Event[];
	public allEvents: Event[];
	public otherEvents: Event[] = [];

	private destroy$: Subject<void> = new Subject();

	constructor(
		private eventsFacadeService: EventsFacadeService,
		private authFacadeService: AuthFacadeService,
		public router: Router
	) {
	}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();

		this.eventsFacadeService.events$.pipe(takeUntil(this.destroy$))
			.subscribe((events: EntityWrapper<Event[]>) => {
				this.events = events;
				this.allEvents = this.events.value;
			});

		this.authFacadeService.user$.pipe(takeUntil(this.destroy$))
			.subscribe((user: EntityWrapper<User>) => {
				this.user = user;
			});

		this.userEvents$ = this.authFacadeService.user$.pipe(
			pluck('value'),
			switchMap((user: User) => this.eventsFacadeService.getUserEvents$(user)));
		this.userEvents$.subscribe((allEvents: Event[]) => {
			this.myEvents = allEvents;
			if (this.myEvents !== undefined) {
				this.otherEvents = this.allEvents.filter((i: Event) => !this.myEvents.includes((i)));
			}
		});
	}

	public goToSignUp(): void {
		this.router.navigateByUrl('/signup');
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
