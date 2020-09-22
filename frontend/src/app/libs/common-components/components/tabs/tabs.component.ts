import { AfterViewInit, Component, ContentChildren, Input, QueryList, ViewChild } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { TabsPanelComponent } from '../tabs-panel/tabs-panel.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements AfterViewInit {

	private defaultBodyAnimationDuration: string;

	@ContentChildren(TabsPanelComponent)
	private tabs: QueryList<TabsPanelComponent>;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@ViewChild(MatTabGroup)
	public tabGroup: MatTabGroup;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}

	public ngAfterViewInit(): void {
		const matTabs: MatTab[] = this.tabs.map((tab: TabsPanelComponent) => tab.matTab);
		this.disableBodyAnimation();
		this.tabGroup._tabs.reset([matTabs]);
		this.enableBodyAnimation();
	}

	private disableBodyAnimation(): void {
		this.defaultBodyAnimationDuration = this.tabGroup.animationDuration;
		this.tabGroup.animationDuration = '0';
	}

	private enableBodyAnimation(): void {
		setTimeout(() => {
			this.tabGroup.animationDuration = this.defaultBodyAnimationDuration;
		}, 0);
	}
}
