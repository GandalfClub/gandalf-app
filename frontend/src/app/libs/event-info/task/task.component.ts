import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
	public task: Task;

	private destroy$: Subject<void> = new Subject<void>();

	constructor(private eventInfoFacadeService: EventInfoFacadeService) { }

	public ngOnInit(): void {
		this.eventInfoFacadeService
			.selectedTask$
			.pipe(takeUntil(this.destroy$))
			.subscribe((task: Task) => this.task = task);

	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
