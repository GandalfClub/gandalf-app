import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-time',
  templateUrl: './event-time.component.html',
  styleUrls: ['./event-time.component.scss']
})
export class EventTimeComponent {

	@Input()
	public startTime: Date;

	@Input()
	public endTime: Date;

	@Input()
	public isEventInProgress: boolean;

	public timeFormat: string = 'h:mm a';
}
