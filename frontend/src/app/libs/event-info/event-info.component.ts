import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { Tab } from '../common-components/components/tab-navigation/models/tab.model';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs.enum';
import { EventFacadeService } from '../event-description/store/event/event.facade';
import { Event } from '../landing/models/event';
import { AutoCloseable } from '../utils/auto-closable';

@Component({
	selector: 'app-event-info',
	templateUrl: './event-info.component.html',
	styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent extends AutoCloseable implements OnInit, OnDestroy {
	public tabs: Tab[] = [];
	public currentTab: Tab;

	constructor(
		private eventFacadeService: EventFacadeService,
		private breadcrumbFacadeService: BreadcrumbFacadeService,
		private router: Router,
		private aciveRoute: ActivatedRoute
	) {
		super();
	}

	public ngOnInit(): void {
		this.eventFacadeService.eventValue$
			.pipe(takeUntil(this.destroyedSource$))
			.subscribe((event: Event) => {
				if (!event) {
					return;
				}

				this.initTabs(event.tasks.length);
				this.breadcrumbFacadeService.loadBreadcrumb(event.generalInfo.title);
				this.router.navigate([this.currentTab.title], { relativeTo: this.aciveRoute });
			});
	}

	public changeTab(tab: Tab): void {
		this.currentTab = tab;
		this.router.navigate([tab.title], { relativeTo: this.aciveRoute });
	}

	private initTabs(eventTasksAmount: number): void {
		this.tabs = [{ title: Tabs.Tasks, amount: eventTasksAmount }];
		this.currentTab = this.tabs[0];
	}
}
