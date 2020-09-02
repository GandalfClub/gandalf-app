import { Component, Input } from '@angular/core';
import { HintMenuItem } from '../../models/hint-menu-item';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent {

	@Input()
	public isDraft: boolean;

	@Input()
	public name: string;

	@Input()
	public startDate: Date;

	@Input()
	public endDate: Date;

	@Input()
	public startTime: Date;

	@Input()
	public endTime: Date;

	@Input()
	public statusList: string[];

	@Input()
	public menuItems: HintMenuItem[];

  constructor() {
		// TODO:	remove after component tested manually
		this.startDate = new Date('2020-03-04');
		this.endDate = new Date('2020-04-05');
		this.startTime = new Date('2020-03-04T13:30');
		this.endTime = new Date('2020-03-04T16:30');
	}
}
