import { Component, Input } from '@angular/core';
import { EventTileMenuItem } from '../../models/event-tile-menu-item';

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
	public startDateTime: Date;

	@Input()
	public endDateTime: Date;

	@Input()
	public statusList: string[];

	@Input()
	public menuItems: EventTileMenuItem[];

  constructor() {
		// TODO:	remove after component tested manually
		this.startDateTime = new Date('2020-03-04T13:30');
		this.endDateTime = new Date('2020-03-04T18:30');
		this.menuItems = [
			{
				name: 'Action1',
				action(): any {
					alert('fff');
				}
			},
			{
				name: 'Action2',
				action(): any {
					alert('vvv');
				}
			},
		];
	}
}
