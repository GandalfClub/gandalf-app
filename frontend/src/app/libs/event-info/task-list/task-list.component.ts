import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../landing/models/task.model';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListComponent implements OnInit {
	@Input()
	public tasks: Task[] = [];

	@Output()
	public selected: EventEmitter<Task> = new EventEmitter<Task>();

	public selectedTaskIndex: number = 0;

	public get tasksLength(): number {
		return this.tasks?.length ?? 0;
	}

	constructor(
		private router: Router,
		private activeRoute: ActivatedRoute,
	) { }

	public ngOnInit(): void {
		const task: Task = this.tasks[0];
		if (task) {
			this.taskOpened(0);
		}
	}

	public taskOpened(index: number): void {
		this.router.navigate([index], { relativeTo: this.activeRoute });
		this.selected.emit(this.tasks[index]);
		this.selectedTaskIndex = index;
	}
}
