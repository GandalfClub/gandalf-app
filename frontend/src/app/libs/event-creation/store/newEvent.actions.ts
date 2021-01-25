import { Action } from '@ngrx/store';

export enum NewEventActionTypes {
	SetTitleForEvent = '[NewEvent] set title for new event',
}

export class NewEventAction implements Action {
	public readonly type: NewEventActionTypes = NewEventActionTypes.SetTitleForEvent;
	constructor(public payload: string) { }
};
