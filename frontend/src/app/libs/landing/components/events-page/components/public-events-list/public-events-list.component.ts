import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Event } from 'src/app/libs/landing/models/event';
import { EventQuantityLabel } from '../../Models/event-quantity-label.enum';

@Component({
	selector: 'app-public-events-list',
	templateUrl: './public-events-list.component.html',
	styleUrls: ['./public-events-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicEventsListComponent {

	@Input()
	public events: Event[] = [];

	public allEventsLabel: EventQuantityLabel = EventQuantityLabel.All;

}
