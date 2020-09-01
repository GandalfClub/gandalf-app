import { Action } from '@ngrx/store';
import { EventDescription } from '../../models/event-description';

export enum EventDescriptionActionTypes {
	LoadEventDescription = '[EventDescription] Load Event',
	LoadEventDescriptionsSuccess = '[EventDescription] Load Event Success',
	LoadEventDescriptionsFailure = '[EventDescription] Load Event Failure',
}

export class LoadEventDescription implements Action {
	public readonly type: EventDescriptionActionTypes.LoadEventDescription = EventDescriptionActionTypes.LoadEventDescription;
	constructor(public payload: string) {}
}
export class LoadEventDescriptionsSuccess implements Action {
	public readonly type: EventDescriptionActionTypes.LoadEventDescriptionsSuccess = EventDescriptionActionTypes.LoadEventDescriptionsSuccess;
	constructor(public payload: EventDescription) {}
}
export class LoadEventDescriptionsFailure implements Action {
	public readonly type: EventDescriptionActionTypes.LoadEventDescriptionsFailure = EventDescriptionActionTypes.LoadEventDescriptionsFailure;
	constructor(public payload: Error) {}
}

export type EventDescriptionTypes = LoadEventDescription | LoadEventDescriptionsSuccess | LoadEventDescriptionsFailure;
