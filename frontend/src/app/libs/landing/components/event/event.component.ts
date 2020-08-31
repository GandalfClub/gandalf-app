import { Component, Input } from '@angular/core';
import { Event } from '../../models/event';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
})
export class EventComponent {
	@Input() public event: Event;
}
