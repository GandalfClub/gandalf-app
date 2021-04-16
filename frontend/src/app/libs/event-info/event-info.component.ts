import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbFacadeService } from '../common-components/components/breadcrumb/store/breadcrumb.facade';
import { Tab } from '../common-components/components/tab-navigation/models/tab.model';
import { Tabs } from '../common-components/components/tab-navigation/models/tabs.enum';
import { EventFacadeService } from '../event-description/store/event/event.facade';
import { Event } from '../landing/models/event';

@Component({
	selector: 'app-event-info',
	templateUrl: './event-info.component.html',
	styleUrls: ['./event-info.component.scss']
})
export class EventInfoComponent implements OnInit, OnDestroy {
	public tabs: Tab[] = [];
	public currentTab: Tab;

	private subs: Subscription = new Subscription();

	constructor(
		private eventFacadeService: EventFacadeService,
		private breadcrumbFacadeService: BreadcrumbFacadeService,
		private router: Router,
		private aciveRoute: ActivatedRoute
	) { }

	public ngOnInit(): void {
		const eventSub: Subscription = this.eventFacadeService.eventValue$
			.subscribe((event: Event) => {
				if (!event) {
					return;
				}

				this.initTabs(event.tasks.length);
				this.breadcrumbFacadeService.loadBreadcrumb(event.title);
				this.router.navigate([this.currentTab.title], { relativeTo: this.aciveRoute });
			});

		this.subs.add(eventSub);
	}

	public ngOnDestroy(): void {
		this.subs.unsubscribe();
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
