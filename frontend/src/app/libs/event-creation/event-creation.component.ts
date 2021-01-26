import { Component, OnInit, ViewChild } from '@angular/core';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { FormGroup } from '@angular/forms';
import { NewEvent } from './store/model/model';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreationComponent implements OnInit {
	public currentTab: string = 'generalTab';
	// public eventCreated: boolean = false;
	public newEvent: NewEvent;
	@ViewChild('generalInfoPage')
	public generalInfoPage: FormData;
	public formFromGeneralComponent: FormGroup;
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
	public saveAsDraft(): void {
		this.newEvent.isDraft = true;
		console.log('newEvent', this.newEvent);
	}

	public send(): void {
		this.newEvent.isDraft = false;
		console.log('newEvent', this.newEvent);
	}
	public getFormFromGeneralComponent(data: FormGroup): void {
		this.formFromGeneralComponent = data.value;
		this.newEvent = { ...this.newEvent, ...this.formFromGeneralComponent };
	}
}
