import { Action } from '@ngrx/store';

export enum ContainerActionTypes {
	LoadSamples = '[Sample] Load Samples',
	LoadSamplesSuccess = '[Sample] Load Samples Success',
	LoadSamplesFailure = '[Sample] Load Samples Failure',
	HideHeaderAndFooter = '[CONTAINER] Hide Header and Footer',
}

export class LoadSamples implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LoadSamples;
}

export class LoadSamplesSuccess implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LoadSamplesSuccess;
	constructor(public payload: { data: any }) { }
}

export class LoadSamplesFailure implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.LoadSamplesFailure;
	constructor(public payload: { error: any }) { }
}

export class HideHeaderAndFooter implements Action {
	public readonly type: ContainerActionTypes = ContainerActionTypes.HideHeaderAndFooter;
}

export type ContainerActions = LoadSamples | LoadSamplesSuccess | LoadSamplesFailure | HideHeaderAndFooter;
