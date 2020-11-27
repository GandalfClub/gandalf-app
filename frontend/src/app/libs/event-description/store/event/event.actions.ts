import { Action } from '@ngrx/store';
import { EventCard } from '../../../landing/models/event';

export enum EventActionTypes {
	LoadEvent = '[Event] Load Event',
	LoadEventSuccess = '[Event] Load Event Success',
	LoadEventFail = '[Event] Load Event Failure',
}

export class LoadEvent implements Action {
	public readonly type: EventActionTypes.LoadEvent = EventActionTypes.LoadEvent;
	constructor(public payload: string) {}
}
export class LoadEventSuccess implements Action {
	public readonly type: EventActionTypes.LoadEventSuccess = EventActionTypes.LoadEventSuccess;
	constructor(public payload: EventCard) {}
}
export class LoadEventFail implements Action {
	public readonly type: EventActionTypes.LoadEventFail = EventActionTypes.LoadEventFail;
	constructor(public payload: Error) {}
}

export type EventActions = LoadEvent | LoadEventSuccess | LoadEventFail;
