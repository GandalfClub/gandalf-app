import { Action } from '@ngrx/store';
import { NewEvent } from './model/model';

export enum NewEventsActionTypes {
	SetTitleForEvent = '[NewEvent] set title for new event',
	CreateEvent = '[NewEvent] send event to server',
	CreateEventSuccess = '[NewEvent] send event to server successfully',
	CreateEventFail = '[NewEvent] send event to server failed',

}

export class SetTitleAction implements Action {
	public readonly type: NewEventsActionTypes = NewEventsActionTypes.SetTitleForEvent;
	constructor(public payload: string) { }
}

export class CreateEventAction implements Action {
	public readonly type: NewEventsActionTypes = NewEventsActionTypes.CreateEvent;
	constructor(public payload: NewEvent) { }
}

export class CreateEventActionSuccess implements Action {
	public readonly type: NewEventsActionTypes = NewEventsActionTypes.CreateEventSuccess;
	constructor(public payload: NewEvent) { }
}

export class CreateEventActionFail implements Action {
	public readonly type: NewEventsActionTypes = NewEventsActionTypes.CreateEventFail;
	constructor(public payload: Error) { }
}

export type NewEventsActions = SetTitleAction | CreateEventAction | CreateEventActionSuccess | CreateEventActionFail;
