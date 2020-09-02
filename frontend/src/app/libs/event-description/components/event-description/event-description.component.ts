import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventFacadeService } from '../../store/event-description/event-description.facade';
import { Observable } from 'rxjs';
import { Event } from '../../../landing/models/event';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Component({
	selector: 'app-event-description',
	templateUrl: './event-description.component.html',
	styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit {
	public eventId: string;
	public user$: Observable<EntityWrapper<User>>;

	constructor(
		private activatedRoute: ActivatedRoute,
		private eventFacadeService: EventFacadeService,
		private authFacadeService: AuthFacadeService
	) {}

	public ngOnInit(): void {
		this.eventId = this.activatedRoute.snapshot.params.id;
		this.eventFacadeService.getEvent(this.eventId);
		this.user$ = this.authFacadeService.user$;
	}

	public get event$(): Observable<Event> {
		return this.eventFacadeService.eventValue$;
	}
}
