import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { FormGroup } from '@angular/forms';
import { NewEvent } from './store/model/model';
import { NewEventFacadeService } from './store/newEvent.facade';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
	public currentTab: string = 'generalTab';
	public newEvent: NewEvent;
	public formFromGeneralComponent: FormGroup;
	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService, public newEventsFacadeService: NewEventFacadeService) {
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
	public saveAsDraft(): void {
		this.formFromGeneralComponent.patchValue({
			isDraft: true,
			isActive: true
		});
		this.newEventsFacadeService.createNewEvent(this.formFromGeneralComponent.value);
		console.log(this.formFromGeneralComponent.value);
	}

	public send(): void {
		this.formFromGeneralComponent.patchValue({
			isDraft: false,
			isActive: true
		});
		this.newEventsFacadeService.createNewEvent(this.formFromGeneralComponent.value);
	}

	public getFormFromGeneralComponent(data: FormGroup): void {
		this.formFromGeneralComponent = data;
	}
}
