import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';
import {Tabs} from './models/tabs';

@Component({
	selector: 'app-tab-navigation',
	templateUrl: './tab-navigation.component.html',
	styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	@Output() changeTab: EventEmitter<Tabs> = new EventEmitter<Tabs>();

  public tabsEnum: typeof Tabs = Tabs;

	public currentTab: Tabs = Tabs.generalTab;

	public changePage(tab: Tabs): void {
		this.currentTab = tab;
		this.changeTab.emit(tab);
	}

	public get generalTab(): boolean {
		return this.currentTab === Tabs.generalTab;
	}

	public get tasksTab(): boolean {
		return this.currentTab === Tabs.tasksTab;
	}

	public get invitationsTab(): boolean {
		return this.currentTab === Tabs.invitationsTab;
	}

}
