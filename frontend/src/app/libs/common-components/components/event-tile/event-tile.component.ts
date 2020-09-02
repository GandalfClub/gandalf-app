import { Component, Input } from '@angular/core';

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
	public menuActions: Map<string, () => void>;

  constructor() {
		//TODO:	remove after tests
		this.startTime = new Date(12, 3, 2020, 13, 30);
		this.endTime = new Date(12, 3, 2020, 16, 30);
		//TODO: remove after menu test
		this.menuActions = new Map([
			['Action1', () => { alert('action1 emitted'); }],
			['Action2', () => { alert('action2 emitted'); }]
		]);
	}
}
