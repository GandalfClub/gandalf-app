import { Component, Input } from '@angular/core';
import { Event } from '../../../landing/models/event';
import { User } from 'src/app/libs/auth/models/user';
import { EntityWrapper } from 'src/app/libs/auth/models/entity-wraper';
import { EntityStatus } from 'src/app/libs/auth/models/entity-status';

@Component({
	selector: 'app-event-description',
	templateUrl: './event-description.component.html',
	styleUrls: ['./event-description.component.scss'],
})
export class EventDescriptionComponent {
	@Input() public event: Event;

	@Input() public user: EntityWrapper<User>;

	public get userLoginStatus(): boolean {
		return this.user.status === EntityStatus.Success;
	}
}
