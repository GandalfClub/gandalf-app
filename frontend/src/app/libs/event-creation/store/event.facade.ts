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
import { ITask } from '../../common-components/components/tasks-creator/models/task';

@Injectable({
	providedIn: 'root',
})
export class NewEventFacadeService {

	constructor(private store: Store<GeneralEventState>) { }

	get generalTitle$(): Observable<string> {
		return this.store.pipe(select(selectTitleForGeneralEvent));
	}

	get tasks$(): Observable<Map<Symbol, ITask>> {
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

  public createTask(task: ITask): void {
    this.store.dispatch(new CreateTaskEventAction(task));
  }

  public deleteTask(taskId: Symbol): void {
    this.store.dispatch(new DeleteTaskEventAction(taskId));
  }
}
