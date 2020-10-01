import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card-date',
  templateUrl: './event-card-date.component.html',
  styleUrls: ['./event-card-date.component.scss']
})
export class EventCardDateComponent {

	@Input()
	public startDate: Date;

	@Input()
	public endDate: Date;

	public dateFormat: string = 'd MMM yyyy';
}
