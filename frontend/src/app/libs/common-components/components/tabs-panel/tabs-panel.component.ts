import { Component, Input, ViewChild } from '@angular/core';
import { MatTab } from '@angular/material/tabs';

@Component({
  selector: 'app-tabs-panel',
  templateUrl: './tabs-panel.component.html',
  styleUrls: ['./tabs-panel.component.scss']
})
export class TabsPanelComponent {

  @ViewChild(MatTab)
	public matTab: MatTab;

	@Input()
	public label: string;
}
