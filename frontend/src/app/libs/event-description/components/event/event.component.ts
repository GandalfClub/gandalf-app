import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventFacadeService } from '../../store/event/event.facade';
import { Observable } from 'rxjs';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { User } from 'src/app/libs/auth/models/user';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { Event } from '../../../landing/models/event';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
	public eventId: string;
	public user$: Observable<EntityWrapper<User>>;
	constructor(
		private activatedRoute: ActivatedRoute,
		private eventFacadeService: EventFacadeService,
		private authFacadeService: AuthFacadeService
	) {}

	public ngOnInit(): void {
		this.eventId = this.activatedRoute.snapshot.params.id;
		this.eventFacadeService.loadEvent(this.eventId);
		this.user$ = this.authFacadeService.user$;
	}

	public get event$(): Observable<Event> {
		return this.eventFacadeService.eventValue$;
	}
}
