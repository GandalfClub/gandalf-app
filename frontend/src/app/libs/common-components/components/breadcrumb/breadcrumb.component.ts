import { Component, OnInit } from '@angular/core';
import { BreadCrumb } from './model/breadcrumb.model';
import { BreadcrumbFacadeService } from './store/breadcrumb.facade';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
	public breadcrumbs: BreadCrumb[] = [];
	public lastValueBreadcumb: string;

	constructor(public breadcrumbFacadeService: BreadcrumbFacadeService) {
		this.breadcrumbFacadeService.label$.subscribe((item: string) => this.lastValueBreadcumb = item);
	}

	public ngOnInit(): void {
		this.breadcrumbs = [
			{ url: '/landing', label: 'Events' },
			{ label: this.lastValueBreadcumb }
		];
	}
}
