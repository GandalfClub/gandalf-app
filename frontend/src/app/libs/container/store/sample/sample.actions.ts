import { Action } from '@ngrx/store';

export enum SampleActionTypes {
	LoadSamples = '[Sample] Load Samples',
	LoadSamplesSuccess = '[Sample] Load Samples Success',
	LoadSamplesFailure = '[Sample] Load Samples Failure',
}

export class LoadSamples implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamples;
}

export class LoadSamplesSuccess implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamplesSuccess;
	constructor(public payload: { data: any }) { }
}

export class LoadSamplesFailure implements Action {
	public readonly type: SampleActionTypes = SampleActionTypes.LoadSamplesFailure;
	constructor(public payload: { error: any }) { }
}

export type SampleActions = LoadSamples | LoadSamplesSuccess | LoadSamplesFailure;
