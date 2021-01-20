import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../breadcrumb/store/breadcrumb.facade';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
	public currentTab: string = 'generalTab';
	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService) {
	}

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('New Event');
	}
	public get generalTab(): boolean {
		return this.currentTab === 'generalTab';
	}

	public get tasksTab(): boolean {
		return this.currentTab === 'tasksTab';
	}

	public get invitationsTab(): boolean {
		return this.currentTab === 'invitationsTab';
	}

	public changeTab(tab: string): void {
		this.currentTab = tab;
	}
}
