import { Action } from '@ngrx/store';
import { Event } from '../../../landing/models/event';
import { EventParticipation } from '../../../landing/models/event-participation.class';

export enum EventActionTypes {
	LoadEvent = '[Event] Load Event',
	LoadEventSuccess = '[Event] Load Event Success',
	LoadEventFail = '[Event] Load Event Failure',

	RegForEvent = '[Event] Registrate For The Event',
	RegForEventSuccess = '[Event] Registrate For The Event Success',
	RegForEventFail = '[Event] Registrate For The Event Failure',
}

export class LoadEvent implements Action {
	public readonly type: EventActionTypes.LoadEvent = EventActionTypes.LoadEvent;
	constructor(public payload: string) { }
}
export class LoadEventSuccess implements Action {
	public readonly type: EventActionTypes.LoadEventSuccess = EventActionTypes.LoadEventSuccess;
	constructor(public payload: Event) { }
}
export class LoadEventFail implements Action {
	public readonly type: EventActionTypes.LoadEventFail = EventActionTypes.LoadEventFail;
	constructor(public payload: Error) { }
}

export class RegForEvent implements Action {
	public readonly type: EventActionTypes.RegForEvent = EventActionTypes.RegForEvent;
	constructor(public payload: EventParticipation) { }
}
export class RegForEventSuccess implements Action {
	public readonly type: EventActionTypes.RegForEventSuccess = EventActionTypes.RegForEventSuccess;
	constructor(public payload: EventParticipation) { }
}
export class RegForEventFail implements Action {
	public readonly type: EventActionTypes.RegForEventFail = EventActionTypes.RegForEventFail;
	constructor(public payload: Error) { }
}

export type EventActions =
		LoadEvent
	| LoadEventSuccess
	| LoadEventFail
	| RegForEvent
	| RegForEventSuccess
	| RegForEventFail;
