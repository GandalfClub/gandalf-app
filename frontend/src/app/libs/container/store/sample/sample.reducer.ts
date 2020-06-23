
import { SampleActions, SampleActionTypes } from './sample.actions';

export const sampleFeatureKey: string = 'sample';

export interface State {
	sample: string;
}

export const initialState: State = {
	sample: 'sample'
};

export function reducer(state: State = initialState, action: SampleActions): State {
	switch (action.type) {

		case SampleActionTypes.LoadSamples:
			return state;

		case SampleActionTypes.LoadSamplesSuccess:
			return state;

		case SampleActionTypes.LoadSamplesFailure:
			return state;

		default:
			return state;
	}
}
