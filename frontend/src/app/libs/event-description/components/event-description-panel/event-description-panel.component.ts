import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../../../landing/models/event';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';
import { BreadcrumbFacadeService } from 'src/app/libs/common-components/components/breadcrumb/store/breadcrumb.facade';
import { EventFacadeService } from '../../store/event/event.facade';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';

@Component({
	selector: 'app-event-description-panel',
	templateUrl: './event-description-panel.component.html',
	styleUrls: ['./event-description-panel.component.scss'],
})
export class EventDescriptionPanelComponent implements OnInit {

	@Input() public event: Event;

	@Input() public user: EntityWrapper<User>;

	constructor(
		private breadcrumbFacadeService: BreadcrumbFacadeService,
		private eventFacadeService: EventFacadeService) { }

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb(this.event.title);
	}

	public get userLoginStatus(): boolean {
		return this.user.status === EntityStatus.Success;
	}

	public onTakePartInEvent(participation: EventParticipation): void {
		this.eventFacadeService.regForEvent(participation);
	}
}
