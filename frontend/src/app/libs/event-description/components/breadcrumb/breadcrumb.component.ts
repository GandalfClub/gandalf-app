import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { BreadCrumb } from './model/breadcrumb.model';
import { Observable } from 'rxjs';
import { Event } from '../../../landing/models/event';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
	public breadcrumbs: BreadCrumb[] = [];
	@Input() public event: Event;

	constructor(private activatedRoute: ActivatedRoute) { }

	public ngOnInit(): void {
		this.breadcrumbs = [
			{ url: '/landing', label: this.activatedRoute.routeConfig.data.breadcrumb },
			{ label: this.event.title }
		];
	}
}
