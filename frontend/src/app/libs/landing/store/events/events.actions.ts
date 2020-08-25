import { Action } from '@ngrx/store';
import { Event } from '../../models/event';

export enum ActionType {
	GetEvents = '[Events/API] Get events',
	GetEventsSuccess = '[Events/API] Get events success',
	GetEventsFail = '[Events/API] Get events fail',
}

export class GetEvents implements Action {
	public readonly type: ActionType.GetEvents = ActionType.GetEvents;
}

export class GetEventsSuccessfuly implements Action {
	public readonly type: ActionType.GetEventsSuccess = ActionType.GetEventsSuccess;
	constructor(public payload: Event[]) {}
}

export class GetEventsFailed implements Action {
	public readonly type: ActionType.GetEventsFail = ActionType.GetEventsFail;
	constructor(public payload: Error) {}
}

export type EventsAction = GetEvents | GetEventsSuccessfuly | GetEventsFailed;
