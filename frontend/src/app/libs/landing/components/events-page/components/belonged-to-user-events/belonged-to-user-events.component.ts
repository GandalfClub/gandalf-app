import { Component, Input } from '@angular/core';
import { EventListLabelColors } from 'src/app/libs/landing/models/event-list-label-colors.enum';
import { Event } from '../../../../models/event';
import { EventQuantityLabel } from '../../Models/event-quantity-label.enum';

@Component({
  selector: 'app-belonged-to-user-events',
  templateUrl: './belonged-to-user-events.component.html',
  styleUrls: ['./belonged-to-user-events.component.scss']
})
export class BelongedToUserEventsComponent {
	@Input()
	public events: Event[] = [];

  public myEvents: EventQuantityLabel = EventQuantityLabel.My;
  public labelColor: EventListLabelColors = EventListLabelColors.Dark;

  constructor() { }
}
