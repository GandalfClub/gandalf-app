import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { NewEventFacadeService } from '../store/event.facade';

@Component({
	selector: 'app-tasks-creator-page',
	templateUrl: './tasks-creator-page.component.html',
	styleUrls: ['./tasks-creator-page.component.scss'],
})
export class TasksCreatorPageComponent {
	public selectedTask: Task;

	@Output()
	public passForm: EventEmitter<Task> = new EventEmitter<Task>();

	@Output()
	public removeTask: EventEmitter<Symbol> = new EventEmitter<Symbol>();

	constructor(private newEventFacadeService: NewEventFacadeService) {
		this.newEventFacadeService.loadTasks();
	}

	public showSelectedTask(task: Task): void {
		this.selectedTask = task;
	}
}
