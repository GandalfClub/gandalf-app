import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Solution, SolutionStatus, Task, TasksTypes } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
	public taskFormGroup: FormGroup;
	public taskTypes: typeof TasksTypes = TasksTypes;
	public solutionStatus: typeof SolutionStatus = SolutionStatus;
	public task: Task;
	public solution: Solution = {
		status: SolutionStatus.Draft,
		value: null
	};
	public get isTaskPending(): boolean {
		return this.solution.status === this.solutionStatus.Pending;
	}

	private destroy$: Subject<void> = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private eventInfoFacadeService: EventInfoFacadeService,
	) { }

	public ngOnInit(): void {
		this.eventInfoFacadeService
			.selectedTask$
			.pipe(takeUntil(this.destroy$))
			.subscribe((task: Task) => {
				this.task = task;
				if (this.task.hasOwnProperty('solution')) {
					this.solution = this.task.solution;
				} else {
					this.solution = {
						status: SolutionStatus.Draft,
						value: null
					}
				}
				this.taskFormGroup = this.formBuilder.group({
					answer: this.isTaskPending ? this.solution.value : ''
				});
			});

		this.taskFormGroup.get('answer').valueChanges
			.pipe(takeUntil(this.destroy$))
			.subscribe(
				(answer: string) => {
					this.eventInfoFacadeService.setSolution({
						...this.task,
						solution: {
							status: SolutionStatus.Draft,
							value: answer
						}
					});
				}
			);
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public submitSolution(): void {
		if (this.isTaskPending) {return}
		
		this.eventInfoFacadeService.setSolution({
			...this.task,
			solution: {
				status: SolutionStatus.Pending,
				value: this.taskFormGroup.value.answer
			}
		});
	}

	public setCodeAnswer(data: string) {
		if (this.task.taskType !== this.taskTypes.Coding) {return}
		this.taskFormGroup.setValue({answer: data})
	}
}
