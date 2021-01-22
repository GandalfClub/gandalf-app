import { Action } from '@ngrx/store';

export enum BreadcrumbActionTypes {
	Breadcrumb = '[Breadcrumb] get last part',
}

export class BreadcrumbAction implements Action {
	public readonly type: BreadcrumbActionTypes = BreadcrumbActionTypes.Breadcrumb;
	constructor(public payload: string) { }
}
