import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { EventCard } from 'src/app/libs/landing/models/event';
import { EventQuantityLabel } from '../../Models/event-quantity-label.enum';

@Component({
	selector: 'app-public-events-list',
	templateUrl: './public-events-list.component.html',
	styleUrls: ['./public-events-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PublicEventsListComponent {

	@Input()
	public events: EventCard[] = [];

	public allEventsLabel: EventQuantityLabel = EventQuantityLabel.All;

}
