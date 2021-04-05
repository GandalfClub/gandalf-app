import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Answer, Task } from '../models/task';
import { TasksTypes } from '../models/tasks-creator';
import { takeUntil } from 'rxjs/operators';
import { NewEventFacadeService } from '../../../../event-creation/store/event.facade';
import { AutoCloseable } from '../../../../utils/auto-closable';

@Component({
	selector: 'app-tasks-list',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
})
export class TasksListComponent extends AutoCloseable implements OnInit {
	public taskList: Task[];

	public selectedTaskIndex: number;

	@Output()
	public selectedTask: EventEmitter<Task> = new EventEmitter<Task>();

	constructor(private eventFacadeService: NewEventFacadeService) {
		super();
	}

	public ngOnInit(): void {
		this.eventFacadeService.tasks$
			.pipe(
				takeUntil(this.destroyedSource$),
			)
			.subscribe(
				(tasks: Map<Symbol, Task>): void => {
					this.taskList = [...tasks.values()];
					if (!Boolean(this.selectedTaskIndex)) {
						this.selectedTaskIndex = 0;
						this.showTask(this.selectedTaskIndex);
					}
				},
			);

		this.showTask(0);
	}

	get tasksLength(): number {
		return this.taskList?.length ?? 0;
	}

	public showTask(index: number): void {
		this.selectedTask.emit(this.taskList[index]);
		this.selectedTaskIndex = index;
	}

	public addNewTask(): void {
		const defaultTask: Task = {
			id: Symbol('id'),
			taskName: 'Task name',
			taskType: TasksTypes.Single,
			mentorCheck: false,
			maxScore: null,
			question: null,
			answers: new Set<Answer>([
				{
					label: '',
					isCorrect: false,
				},
				{
					label: '',
					isCorrect: false,
				},
			]),
		};

		this.taskList.push(defaultTask);
		this.showTask(this.taskList.length - 1);
	}
}
