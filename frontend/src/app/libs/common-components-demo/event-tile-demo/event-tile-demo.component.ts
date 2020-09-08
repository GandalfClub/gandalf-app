import { Component } from '@angular/core';
import { EventTileDataDemo } from '../models/event-tile-data-demo';

@Component({
  selector: 'app-event-tile-demo',
  templateUrl: './event-tile-demo.component.html',
  styleUrls: ['./event-tile-demo.component.scss']
})
export class EventTileDemoComponent {

	public eventTileData: EventTileDataDemo = {
		startDateTime: new Date('2020-01-01T12:00'),
		endDateTime: new Date('2020-01-05T14:00'),
		statusList: ['HR', 'Mentor', 'Administrator'],
		menuItems: [
			{
				name: 'action1',
				action(): void {
					alert('action1 was called');
				},
			},
			{
				name: 'action2',
				action(): void {
					alert('action2 was called');
				}
			}
		],
	};
}
