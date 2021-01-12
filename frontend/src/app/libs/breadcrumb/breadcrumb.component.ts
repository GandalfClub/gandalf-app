import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
	@Input() public event: Event;

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
