import { Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { User } from '../../auth/models/user';
import { Answer, SolutionStatus, Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
	public task: Task;
	public user: User;
	public eventFormGroup: FormGroup;

	private destroy$: Subject<void> = new Subject<void>();

	constructor(
		private formBuilder: FormBuilder,
		private eventInfoFacadeService: EventInfoFacadeService,
	) { }

	public ngOnInit(): void {
		this.eventFormGroup = this.formBuilder.group({
			answer: ''
		});

		this.eventInfoFacadeService
			.selectedTask$
			.pipe(takeUntil(this.destroy$))
			.subscribe((task: Task) => {
				this.task = task;
			});

		this.eventFormGroup.get('answer').valueChanges
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
		this.eventInfoFacadeService.setSolution({
			...this.task,
			solution: {
				status: SolutionStatus.Pending,
				value: this.eventFormGroup.value.answer
			}
		});
	}
}
