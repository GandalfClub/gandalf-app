import { Action } from '@ngrx/store';
import { Event } from '../../models/event';

export enum ActionType {
	GetEvents = '[Events/API] Get events',
	GetEventsSuccessfuly = '[Events/API] Get events successfuly',
	GetEventsFailed = '[Events/API] Get events failed',
}

export class GetEvents implements Action {
	public readonly type: ActionType.GetEvents = ActionType.GetEvents;
}

export class GetEventsSuccessfuly implements Action {
	public readonly type: ActionType.GetEventsSuccessfuly = ActionType.GetEventsSuccessfuly;
	constructor(public payload: Event[]) {}
}

export class GetEventsFailed implements Action {
	public readonly type: ActionType.GetEventsFailed = ActionType.GetEventsFailed;
	constructor(public payload: Error) {}
}

export type EventsAction = GetEvents | GetEventsSuccessfuly | GetEventsFailed;
