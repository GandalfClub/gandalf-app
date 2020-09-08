import { Component, Input } from '@angular/core';
import { Event } from '../../../landing/models/event';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Component({
	selector: 'app-event-description-panel',
	templateUrl: './event-description-panel.component.html',
	styleUrls: ['./event-description-panel.component.scss'],
})
export class EventDescriptionPanelComponent {
	@Input() public event: Event;

	@Input() public user: EntityWrapper<User>;

	public get userLoginStatus(): boolean {
		return this.user.status === EntityStatus.Success;
	}
}
