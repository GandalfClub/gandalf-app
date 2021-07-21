import { Component, OnInit } from '@angular/core';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { AbstractControl, FormGroup } from '@angular/forms';
import { NewEventFacadeService } from './store/event.facade';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs';
import { Task } from '../common-components/components/tasks-creator/models/task';
import { setDateTime } from '../utils/set-date-time';
import { GeneralEventInfo } from './store/model/model';

@Component({
	selector: 'app-event-creation',
	templateUrl: './event-creation.component.html',
	styleUrls: ['./event-creation.component.scss'],
})
export class EventCreationComponent implements OnInit {
	public currentTab: Tabs = Tabs.General;
	public tabsEnum: typeof Tabs = Tabs;

	private formFromGeneralComponent: FormGroup;
	private task: Task;
	private eventId: string;

	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService, public newEventsFacadeService: NewEventFacadeService) {
	}

	public ngOnInit(): void {
		this.breadcrumbFacadeService.loadBreadcrumb('New Event');
	}

	public changeTab(tab: Tabs): void {
		this.currentTab = tab;
	}

	public send(isDraft: boolean): void {
		switch (this.currentTab) {
			case Tabs.General:
				this.formFromGeneralComponent.patchValue({
					isDraft,
				});
				this.configureGeneralEventDate();
				this.newEventsFacadeService.updateEvent(this.formFromGeneralComponent.value, this.eventId);
				break;

			case Tabs.Tasks:
				this.task.isDraft = isDraft;
				this.newEventsFacadeService.createTask(this.task);
				break;

			case Tabs.Invitations:
				break;

			default:
		}
	}

	public setFormFromGeneralComponent(data: FormGroup): void {
		this.formFromGeneralComponent = data;
	}

	public setTaskCreationForm(task: Task): void {
		this.task = task;
	}

	public setEventId(id: string): void {
		this.eventId = id;
	}

	public removeTask(id: Symbol): void {
		this.newEventsFacadeService.deleteTask(id);
	}

	private configureGeneralEventDate(): void {
		const event: GeneralEventInfo = this.formFromGeneralComponent.value;
		const controls: { [key: string]: AbstractControl } = this.formFromGeneralComponent.controls;
		controls.startDate.setValue(setDateTime(event.startDate, event.startTime));
		controls.endDate.setValue(setDateTime(event.endDate, event.endTime));
	}
}
