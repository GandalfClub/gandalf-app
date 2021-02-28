import { Action } from '@ngrx/store';
import { GeneralEvent } from './model/model';
import { ITask } from '../../common-components/components/tasks-creator/models/task';

export enum EventsActionTypes {
	SetTitleForEvent = '[NewEvent] set title for new event',
	CreateGeneralEvent = '[NewEvent] create new general event',
	CreateTaskEvent = '[NewEvent] create new task',
	CreateEventSuccess = '[NewEvent] send general event to server successfully',
	CreateTaskSuccess = '[NewEvent] send task to server successfully',
	CreateEventFail = '[NewEvent] send event to server failed',

}

export class SetTitleAction implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.SetTitleForEvent;
	constructor(public payload: string) { }
}

export class CreateGeneralEventAction implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateGeneralEvent;
	constructor(public payload: GeneralEvent) { }
}

export class CreateEventActionSuccess implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateEventSuccess;
	constructor(public payload: GeneralEvent) { }
}

export class CreateTaskEventAction implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateTaskEvent;
  constructor(public payload: ITask) { }
}

export class CreateTaskActionSuccess implements Action {
  public readonly type: EventsActionTypes = EventsActionTypes.CreateTaskSuccess;
  constructor(public payload: ITask) { }
}

export class CreateEventActionFail implements Action {
	public readonly type: EventsActionTypes = EventsActionTypes.CreateEventFail;
	constructor(public payload: Error) { }
}

export type NewEventsActions = SetTitleAction
  | CreateGeneralEventAction
  | CreateTaskEventAction
  | CreateEventActionSuccess
  | CreateTaskActionSuccess
  | CreateEventActionFail;
