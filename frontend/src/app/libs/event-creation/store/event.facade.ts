import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GeneralEventState } from './event.reducer';
import {
  SetTitleAction,
  CreateGeneralEventAction,
  CreateTaskEventAction,
  DeleteTaskEventAction,
  LoadTasksEventAction
} from './event.actions';
import { selectTasksEvent, selectTitleForGeneralEvent } from './event.selectors';
import { GeneralEvent } from './model/model';
import { Task } from '../../common-components/components/tasks-creator/models/task';

@Injectable({
	providedIn: 'root',
})
export class NewEventFacadeService {

	constructor(private store: Store<GeneralEventState>) { }

	public get generalTitle$(): Observable<string> {
		return this.store.pipe(select(selectTitleForGeneralEvent));
	}

	public get tasks$(): Observable<Map<Symbol, Task>> {
	  return this.store.pipe(select(selectTasksEvent));
  }

	public setTitleForNewEvent(title: string): void {
		this.store.dispatch(new SetTitleAction(title));
	}

	public loadTasks(): void {
	  this.store.dispatch(new LoadTasksEventAction());
  }

	public createGeneralEvent(event: GeneralEvent): void {
		this.store.dispatch(new CreateGeneralEventAction(event));
	}

	public createTask(task: Task): void {
		this.store.dispatch(new CreateTaskEventAction(task));
	}

	public deleteTask(taskId: Symbol): void {
		this.store.dispatch(new DeleteTaskEventAction(taskId));
	}
}
