import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GeneralEventState } from './event.reducer';
import {
  CreateEvent,
  CreateTaskEventAction,
  DeleteTaskEventAction,
  LoadEventTasks,
	UpdateEvent,
	LoadEvent,
} from './event.actions';
import {
	selectEvent,
	getLoadingEventStatus,
	selectTasksEvent,
	selectTitleForGeneralEvent,
} from './event.selectors';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { Event } from '../../landing/models/event';
import { GeneralEventInfo } from './model/model';

@Injectable({
	providedIn: 'root',
})
export class NewEventFacadeService {

	constructor(private store: Store<GeneralEventState>) { }

	public get generalTitle$(): Observable<string> {
		return this.store.pipe(select(selectTitleForGeneralEvent));
	}

	public get event$(): Observable<Event> {
		return this.store.pipe(select(selectEvent));
	}

	public get isEventLoading$(): Observable<boolean> {
		return this.store.pipe(select(getLoadingEventStatus));
	}

	public get tasks$(): Observable<Map<Symbol, Task>> {
	  return this.store.pipe(select(selectTasksEvent));
  }

	public loadTasks(): void {
	  this.store.dispatch(new LoadEventTasks());
  }

	public createEvent(title: string): void {
		this.store.dispatch(new CreateEvent(title));
	}

	public updateEvent(event: GeneralEventInfo, id: string): void {
		this.store.dispatch(new UpdateEvent(event, id));
	}

	public loadEvent(id: string): void {
		this.store.dispatch(new LoadEvent(id));
	}

	public createTask(task: Task): void {
		this.store.dispatch(new CreateTaskEventAction(task));
	}

	public deleteTask(taskId: Symbol): void {
		this.store.dispatch(new DeleteTaskEventAction(taskId));
	}
}
