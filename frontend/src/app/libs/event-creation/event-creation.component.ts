import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { FormGroup } from '@angular/forms';
import { NewEventFacadeService } from './store/newEvent.facade';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs';
import { ITask } from '../common-components/components/tasks-creator/models/task';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
	public currentTab: Tabs = Tabs.generalTab;
  public tabsEnum: typeof Tabs = Tabs;

	private formFromGeneralComponent: FormGroup;
	private taskForm: ITask;

	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService, public newEventsFacadeService: NewEventFacadeService) {
	}

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('New Event');
	}

	public changeTab(tab: Tabs): void {
		this.currentTab = tab;
	}

	public saveAsDraft(): void {
		this.formFromGeneralComponent.patchValue({
			isDraft: true
		});
		this.newEventsFacadeService.createGeneralEvent(this.formFromGeneralComponent.value);
	}

	public send(): void {
		this.formFromGeneralComponent.patchValue({
			isDraft: false
		});
		this.newEventsFacadeService.createGeneralEvent(this.formFromGeneralComponent.value);
	}

	public getFormFromGeneralComponent(data: FormGroup): void {
		this.formFromGeneralComponent = data;
	}

  public getTaskCreationForm(task: ITask): void {
    this.taskForm = task;
  }
}
