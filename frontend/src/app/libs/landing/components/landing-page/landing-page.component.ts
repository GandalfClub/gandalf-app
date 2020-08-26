import { Component, OnInit } from '@angular/core';
import { EventsFacadeService } from '../../store/events/events.facade';

@Component({
	selector: 'app-landing-page',
	templateUrl: './landing-page.component.html',
	styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
	constructor(private eventsFacadeService: EventsFacadeService) {}

	public ngOnInit(): void {
		this.eventsFacadeService.getEvents();
	}
}
