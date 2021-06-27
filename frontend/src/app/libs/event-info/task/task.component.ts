import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EntityWrapper } from '../../auth/models/entity-wraper';
import { User } from '../../auth/models/user';
import { ContainerFacadeService } from '../../container/services/container-facade.service';
import { UserService } from '../../container/services/user.service';
import { Solution, Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
	public task: Task;
	public solutions: Solution[];
	public user: User;
	public currentSolution: Solution;
	public eventFormGroup: FormGroup;

	private destroy$: Subject<void> = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private eventInfoFacadeService: EventInfoFacadeService,
		private userService: ContainerFacadeService

	) { }

	public ngOnInit(): void {
		this.eventFormGroup = this.formBuilder.group({
			answer: ''
		});

		this.eventInfoFacadeService.fetchSolutions();

		this.eventInfoFacadeService
			.selectedTask$
			.pipe(takeUntil(this.destroy$))
			.subscribe((task: Task) => {
				this.task = task
				if (this.task.taskType === 'CODING') {
					this.eventFormGroup.value.answer = this.task.code
				}

				this.eventInfoFacadeService
				.solutions$
				.pipe(takeUntil(this.destroy$))
				.subscribe((solutions: Solution[]) => {
					this.solutions = solutions
					this.currentSolution = this.solutions.filter((solution: Solution) => solution.taskId === this.task.id)[0]
				});
			});

		this.userService
			.user$
			.pipe(takeUntil(this.destroy$))
			.subscribe((user: EntityWrapper<User>) => {
				this.user = user.value
			});

	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public submitSolution(): void {
		console.log(this.eventFormGroup.value)
	}

	public setCodeAnswer(data: string) {
		if (this.task.taskType !== 'CODING') {return}
		this.eventFormGroup.value.answer = data
	}
}
