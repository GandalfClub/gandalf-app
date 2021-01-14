import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../breadcrumb/store/breadcrumb.facade';


@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit{
	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService){

	}
	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('New Event');
	}
}