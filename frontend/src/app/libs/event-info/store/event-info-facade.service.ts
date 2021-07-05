import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { FetchTasks, SetSolution, TaskSelected } from './event-info.actions';
import { getSelectedTask, getTasks } from './event-info.selectors';

@Injectable({
	providedIn: 'root'
})
export class EventInfoFacadeService {

	constructor(private store: Store) { }

	public get tasks$(): Observable<Task[]> {
		return this.store.select(getTasks);
	}

	public get selectedTask$(): Observable<Task> {
		return this.store.select(getSelectedTask);
	}

	public fetchTasks(): void {
		this.store.dispatch(new FetchTasks());
	}

	public selectTask(task: Task): void {
		this.store.dispatch(new TaskSelected(task));
	}

	public setSolution(solution): void {
		this.store.dispatch(new SetSolution(solution));
	}
}
