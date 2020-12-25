import { BreadcrumbAction, BreadcrumbActionTypes } from './breadcrumb.action';

export interface BreadcrumbState {
	label: string;
}

export const initialState: BreadcrumbState = {
	label: ''
};

export function breadcrumbReducer(state: BreadcrumbState = initialState, action: BreadcrumbAction): BreadcrumbState {
	switch (action.type) {

		case BreadcrumbActionTypes.Breadcrumb: {
			return {
				...state,
				label: action.payload
				}
		}

		default:
			return state;
	}
}