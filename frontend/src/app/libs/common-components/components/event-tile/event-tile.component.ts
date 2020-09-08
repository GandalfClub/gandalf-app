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

	get isMenuShown(): boolean {
		return this.menuItems && this.menuItems.length >= 1;
	}
}
