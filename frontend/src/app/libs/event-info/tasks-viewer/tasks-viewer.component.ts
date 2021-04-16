import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-tasks-viewer',
	templateUrl: './tasks-viewer.component.html',
	styleUrls: ['./tasks-viewer.component.scss']
})
export class TasksViewerComponent implements OnInit, OnDestroy {

	public tasks: Task[] = [];

	get tasksLength(): number {
		return this.tasks?.length ?? 0;
	}

	private subs: Subscription = new Subscription();

	constructor(private eventInfoFacadeService: EventInfoFacadeService) { }

	public ngOnInit(): void {
		this.eventInfoFacadeService.fetchTasks();
		const tasksSub: Subscription = this.eventInfoFacadeService
			.tasks$
			.subscribe((tasks: Task[]) => this.tasks = tasks);

		this.subs.add(tasksSub);
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
	}

	public onTaskSelected(task: Task): void {
		this.eventInfoFacadeService.selectTask(task);
	}
}
