import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { EventParticipationControlTypes } from '../../models/participation-control-types.enum';
import { Event } from '../../../landing/models/event';
import { User } from 'src/app/libs/auth/models/user';
import { EventParticipation } from 'src/app/libs/landing/models/event-participation.class';
import { EventUserRoles } from 'src/app/libs/landing/models/event-user-roles.enum';

@Component({
	selector: 'app-event-participation-control',
	templateUrl: './event-participation-control.component.html',
	styleUrls: ['./event-participation-control.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventParticipationControlComponent {
	@Input()
	public event: Event;

	@Input()
	public user: User;

	@Input()
	public showHint: boolean = true;

	@Output()
	public registered: EventEmitter<EventParticipation> = new EventEmitter<EventParticipation>();

	public takePart: EventParticipationControlTypes = EventParticipationControlTypes.TakePart;
	public approved: EventParticipationControlTypes = EventParticipationControlTypes.Approved;
	public openEvent: EventParticipationControlTypes = EventParticipationControlTypes.OpenEvent;
	public waiting: EventParticipationControlTypes = EventParticipationControlTypes.Waiting;
	public noUser: EventParticipationControlTypes = EventParticipationControlTypes.NoUser;

	constructor() { }

	public onTakePart(event: Event, user: User): void {
		if (!user || !event) {
			return;
		}

		const participation: EventParticipation = new EventParticipation(user.id, event.id);
		this.registered.emit(participation);
	}

	public getControlType(event: Event, user: User): EventParticipationControlTypes {
		if (!event) {
			return null;
		}

		if (!user) {
			return EventParticipationControlTypes.NoUser;
		}

		const participation: EventParticipation = this.findParticipation(event, user);

		if (!participation) {
			return EventParticipationControlTypes.TakePart;
		}

		if (participation.approved && this.eventHasStarted(event.startDate)) {
			return EventParticipationControlTypes.OpenEvent;
		}

		if (!participation.approved) {
			return EventParticipationControlTypes.Waiting;
		}

		if (participation.approved) {
			return EventParticipationControlTypes.Approved;
		}

		return EventParticipationControlTypes.TakePart;
	}

	private findParticipation(event: Event, user: User): EventParticipation {
		if (!event.eventParticipations) {
			return null;
		}

		return event.eventParticipations
			.find((value: EventParticipation) => value.userId === user.id);
	}

	private eventHasStarted(startDate: Date): boolean {
		if (!startDate) {
			return false;
		}

		return new Date().getTime() >= new Date(startDate).getTime();
	}
}
