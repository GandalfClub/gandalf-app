import { Action } from '@ngrx/store';
import { GeneralEvent } from './model/model';
import { Task } from '../../common-components/components/tasks-creator/models/task';

export enum EventsActionTypes {
  LoadTasks = '[NewEvent] get tasks from backend',
  LoadTasksSuccess = '[NewEvent] get tasks from backend successfully',
  LoadTasksFail = '[NewEvent] get tasks from backend failed',
	SetTitleForGeneralEvent = '[NewEvent] set title for new event',
	CreateGeneralEvent = '[NewEvent] create new general event',
  CreateGeneralEventSuccess = '[NewEvent] send general event to server successfully',
  CreateGeneralEventFail = '[NewEvent] send event to server failed',
  CreateTaskEvent = '[NewEvent] create new task',
  CreateTaskSuccess = '[NewEvent] send task to server successfully',
  CreateTaskFail = '[NewEvent] send task to server failed',
  DeleteTaskEvent = '[NewEvent] delete task',

}

export class SetTitleAction implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.SetTitleForGeneralEvent;
	constructor(public payload: string) { }
}

export class CreateGeneralEventAction implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateGeneralEvent;
	constructor(public payload: GeneralEvent) { }
}

export class CreateGeneralEventActionSuccess implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateGeneralEventSuccess;
	constructor(public payload: GeneralEvent) { }
}

export class CreateTaskEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateTaskEvent;
  constructor(public payload: Task) { }
}

export class LoadTasksEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadTasks;
  constructor() { }
}

export class DeleteTaskEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.DeleteTaskEvent;
  constructor(public payload: Symbol) { }
}

export class CreateTaskActionSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateTaskSuccess;
  constructor(public payload: Task) { }
}

export class LoadTasksActionSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadTasksSuccess;
  constructor(public payload: Map<Symbol, Task>) { }
}

export class LoadTasksActionFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadTasksFail;
  constructor(public payload: Error) { }
}

export class CreateGeneralEventActionFail implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateGeneralEventFail;
	constructor(public payload: Error) { }
}

export class CreateTaskActionFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateTaskFail;
  constructor(public payload: Error) { }
}

export type NewEventsActions = SetTitleAction
  | CreateGeneralEventAction
  | CreateTaskEventAction
  | LoadTasksActionFail
  | LoadTasksActionSuccess
  | CreateGeneralEventActionSuccess
  | DeleteTaskEventAction
  | CreateTaskActionSuccess
  | CreateTaskActionFail
  | CreateGeneralEventActionFail;
