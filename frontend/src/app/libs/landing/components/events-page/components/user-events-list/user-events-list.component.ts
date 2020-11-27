import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from 'src/app/libs/auth/models/user';
import { EventCard } from '../../../../models/event';
import { EventQuantityLabel } from '../../Models/event-quantity-label.enum';

@Component({
	selector: 'app-user-events-list',
	templateUrl: './user-events-list.component.html',
	styleUrls: ['./user-events-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class UserEventsListComponent implements OnChanges {

	@Input()
	public events: EventCard[] = [];

	@Input()
	public user: User;

	public myEventsLabel: EventQuantityLabel = EventQuantityLabel.My;
	public allEventsLabel: EventQuantityLabel = EventQuantityLabel.All;

	public myEvents: EventCard[];
	public otherEvents: EventCard[];

	public ngOnChanges(changes: SimpleChanges): void {
		this.getMyAndOtherEvents();
	}

	public getMyAndOtherEvents(): void {
		this.myEvents = [];
		this.otherEvents = [];

		if (Boolean(this.events?.length)) {
			this.events.map((event: EventCard) => {
				if (this.isUserInEvent(event)) {
					this.myEvents.push(event);
				} else {
					this.otherEvents.push(event);
				}
			});
		}
	}

	public isUserInEvent(event: EventCard): boolean {
		return event.users.some((user: User) => user.id === this.user.id);
	}

}
