import { Component, EventEmitter, Output } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
	selector: 'app-tab-navigation',
	templateUrl: './tab-navigation.component.html',
	styleUrls: ['./tab-navigation.component.scss'],
})
export class TabNavigationComponent {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
	@Output() changeTab: EventEmitter<string> = new EventEmitter<string>();

	public currentTab: string = 'generalTab';

	public changePage(tab: string): void {
		this.currentTab = tab;
		this.changeTab.emit(tab);
	}

	public get generalTab(): boolean {
		return this.currentTab === 'generalTab';
	}

	public get tasksTab(): boolean {
		return this.currentTab === 'tasksTab';
	}

	public get invitationsTab(): boolean {
		return this.currentTab === 'invitationsTab';
	}

}
