import { Component, OnInit } from '@angular/core';
import { BoxSize } from './models/box-size';
import { EventTileDataDemo } from './models/event-tile-data-demo';

@Component({
	selector: 'app-common-components-demo',
	templateUrl: './common-components-demo.component.html',
	styleUrls: ['./common-components-demo.component.scss']
})
export class CommonComponentsDemoComponent {
	public eventTileData: EventTileDataDemo = {
		container: {
			width: 400,
			height: 117
		},
		startDateTime: new Date('2020-01-01T12:00'),
		endDateTime: new Date('2020-01-05T14:00'),
		statusList: ['HR', 'Mentor', 'Administrator']
	};
}
