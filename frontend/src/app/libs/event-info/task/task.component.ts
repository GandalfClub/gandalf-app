import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
	public task: Task;

	private subs: Subscription = new Subscription();

	constructor(private eventInfoFacadeService: EventInfoFacadeService) { }

	public ngOnInit(): void {
		const taskSub: Subscription = this.eventInfoFacadeService
			.selectedTask$
			.subscribe((task: Task) => this.task = task);

		this.subs.add(taskSub);
	}

	ngOnDestroy(): void {
		this.subs.unsubscribe();
	}
}
