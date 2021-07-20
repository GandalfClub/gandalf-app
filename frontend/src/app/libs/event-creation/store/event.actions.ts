import { Action } from '@ngrx/store';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { Event } from '../../landing/models/event';
import { GeneralEventInfo } from './model/model';

export enum EventsActionTypes {
  LoadEventTasks = '[NewEvent] get tasks from backend',
  LoadEventTasksSuccess = '[NewEvent] get tasks from backend successfully',
  LoadEventTasksFail = '[NewEvent] get tasks from backend failed',

  CreateEvent = '[NewEvent] create event',
  CreateEventSuccess = '[NewEvent] event created successfully',
  CreateEventFail = '[NewEvent] send event to server failed',

  UpdateEvent = '[NewEvent] update event',
  UpdateEventSuccess = '[NewEvent] event updated successfully',
  UpdateEventFail = '[NewEvent] event updating failed',

  LoadEvent = '[NewEvent] load event',
  LoadEventSuccess = '[NewEvent] event loaded successfully',
  LoadEventFail = '[NewEvent] event loading failed',

  CreateEventTask = '[NewEvent] create new task',
  CreateEventTaskSuccess = '[NewEvent] send task to server successfully',
  CreateEventTaskFail = '[NewEvent] send task to server failed',

  DeleteTaskEvent = '[NewEvent] delete task',
}

export class CreateEvent implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEvent;
  constructor(public payload: string) { }
}

export class CreateEventSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEventSuccess;
  constructor(public payload: Event) { }
}

export class CreateEventFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEventFail;
  constructor(public payload: Error) { }
}

export class UpdateEvent implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.UpdateEvent;
  constructor(public payload: GeneralEventInfo, public id: string) { }
}

export class UpdateEventSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.UpdateEventSuccess;
  constructor(public payload: Event) { }
}

export class UpdateEventFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.UpdateEventFail;
  constructor(public payload: Error) { }
}

export class LoadEvent implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEvent;
  constructor(public payload: string) { }
}

export class LoadEventSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEventSuccess;
  constructor(public payload: Event) { }
}

export class LoadEventFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEventFail;
  constructor(public payload: Error) { }
}

export class DeleteTaskEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.DeleteTaskEvent;
  constructor(public payload: Symbol) { }
}

export class CreateTaskEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEventTask;
  constructor(public payload: Task) { }
}

export class CreateTaskActionSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEventTaskSuccess;
  constructor(public payload: Task) { }
}

export class CreateTaskActionFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateEventTaskFail;
  constructor(public payload: Error) { }
}

export class LoadEventTasks implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEventTasks;
  constructor() { }
}

export class LoadEventTasksFail implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEventTasksFail;
  constructor(public payload: Error) { }
}

export class LoadEventTasksSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.LoadEventTasksSuccess;
  constructor(public payload: Map<Symbol, Task>) { }
}


export type NewEventsActions =
  CreateEvent
  | CreateEventSuccess
  | CreateEventFail

  | CreateTaskEventAction
  | CreateTaskActionSuccess
  | CreateTaskActionFail

  | UpdateEvent
  | UpdateEventSuccess
  | UpdateEventFail

  | LoadEventTasksFail
  | LoadEventTasksSuccess
  | DeleteTaskEventAction;
