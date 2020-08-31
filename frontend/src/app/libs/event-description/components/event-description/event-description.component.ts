import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventDescriptionFacadeService } from '../../store/event-description/event-description.facade';
import { AuthFacadeService } from 'src/app/libs/auth/store/auth/auth.facade';
import { Observable } from 'rxjs';
import { EventDescription } from '../../models/event-description';

@Component({
	selector: 'app-event-description',
	templateUrl: './event-description.component.html',
	styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent implements OnInit {
	public eventId: string;
	constructor(private activatedRoute: ActivatedRoute, private eventDescriptionFacadeService: EventDescriptionFacadeService) {}

	public ngOnInit(): void {
		this.eventId = this.activatedRoute.snapshot.params.id;
		this.eventDescriptionFacadeService.getEventDescription(this.eventId);
	}

	public get event$(): Observable<EventDescription> {
		return this.eventDescriptionFacadeService.eventDescriptionValue$;
	}
}
