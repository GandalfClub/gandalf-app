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
}
