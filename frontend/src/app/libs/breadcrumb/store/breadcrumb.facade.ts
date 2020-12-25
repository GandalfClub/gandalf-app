import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { BreadcrumbState } from './breadcrumb.reducer';
import { Observable } from 'rxjs';
import { selectLastValueBreadcrumb } from './breadcrumb.selectors';
import { BreadcrumbAction } from './breadcrumb.action';


@Injectable({
	providedIn: 'root',
})
export class BreadcrumbFacadeService {
	subscribe() {
		throw new Error('Method not implemented.');
	}
	constructor(private store: Store<BreadcrumbState>) { }

	public get label$(): Observable<string> {
		return this.store.pipe(select(selectLastValueBreadcrumb));
	}

	public loadBreadcrumb(label: string): void {
		this.store.dispatch(new BreadcrumbAction(label));
	}

}