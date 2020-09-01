import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-tile',
  templateUrl: './event-tile.component.html',
  styleUrls: ['./event-tile.component.scss']
})
export class EventTileComponent {

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
	public menuActions: Map<string, Function>;

	@Input()
	public isDraft: boolean;

	@Input()
	public statusList: string[];

  constructor() {}
}
