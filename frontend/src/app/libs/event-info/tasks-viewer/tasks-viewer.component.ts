import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

	private destroy$: Subject<void> = new Subject<void>();

	constructor(private eventInfoFacadeService: EventInfoFacadeService) { }

	public ngOnInit(): void {
		this.eventInfoFacadeService.fetchTasks();
		this.eventInfoFacadeService
			.tasks$
			.pipe(takeUntil(this.destroy$))
			.subscribe((tasks: Task[]) => this.tasks = tasks);

	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public taskSelected(task: Task): void {
		this.eventInfoFacadeService.selectTask(task);
	}
}
