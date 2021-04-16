import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { Tab } from './models/tab.model';
import { Tabs } from './models/tabs.enum';

@Component({
	selector: 'app-tab-navigation',
	templateUrl: './tab-navigation.component.html',
	styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent implements OnInit {
	@Input() tabs: Tab[] = [
		{ title: Tabs.General, amount: null },
		{ title: Tabs.Tasks, amount: 0 },
		{ title: Tabs.Invitations, amount: 0 },
		{ title: Tabs.Members, amount: 0 }
	];

	@Output() changeTab: EventEmitter<Tab> = new EventEmitter<Tab>();

	public currentTab: Tab;
	public lightTheme: ComponentTheme = ComponentTheme.Light;

	public changePage(tab: Tab): void {
		this.currentTab = tab;
		this.changeTab.emit(tab);
	}

	public ngOnInit(): void {
		this.currentTab = this.tabs[0];
	}
}
