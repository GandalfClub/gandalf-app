import { Action } from '@ngrx/store';
import { Event } from '../../../landing/models/event';

export enum EventActionTypes {
	LoadEvent = '[EventDescription] Load Event',
	LoadEventSuccess = '[EventDescription] Load Event Success',
	LoadEventFail = '[EventDescription] Load Event Failure',
}

export class LoadEvent implements Action {
	public readonly type: EventActionTypes.LoadEvent = EventActionTypes.LoadEvent;
	constructor(public payload: string) {}
}
export class LoadEventSuccess implements Action {
	public readonly type: EventActionTypes.LoadEventSuccess = EventActionTypes.LoadEventSuccess;
	constructor(public payload: Event) {}
}
export class LoadEventFail implements Action {
	public readonly type: EventActionTypes.LoadEventFail = EventActionTypes.LoadEventFail;
	constructor(public payload: Error) {}
}

export type EventTypes = LoadEvent | LoadEventSuccess | LoadEventFail;
