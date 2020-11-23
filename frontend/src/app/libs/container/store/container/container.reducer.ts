
import { ContainerActions, ContainerActionTypes } from './container.actions';

export const containerFeatureKey: string = 'container';

export interface State {
	hideHeader: boolean;
	hideFooter: boolean;
}

export const initialState: State = {
	hideHeader: false,
	hideFooter: false,
};

export function containerReducer(state: State = initialState, action: ContainerActions): State {
	switch (action.type) {

		case ContainerActionTypes.HideHeaderAndFooter:
			return {
				...state,
				hideHeader: true,
				hideFooter: true
			};

		case ContainerActionTypes.LoadSamples:
			return state;

		case ContainerActionTypes.LoadSamplesSuccess:
			return state;

		case ContainerActionTypes.LoadSamplesFailure:
			return state;

		default:
			return state;
	}
}
