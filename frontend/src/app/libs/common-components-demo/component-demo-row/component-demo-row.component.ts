import { Component, Input } from '@angular/core';
import { DemoComponentState } from '../models/demo-component-state.ts';
import { BoxSize } from '../models/box-size';

@Component({
  selector: 'app-component-demo-row',
  templateUrl: './component-demo-row.component.html',
  styleUrls: ['./component-demo-row.component.scss']
})
export class ComponentDemoRowComponent {

	@Input()
	public container: BoxSize;

	@Input()
	public name: string;

	@Input()
	public states: DemoComponentState[];

	get isHeaderShown(): boolean {
		return this.states.some((state: DemoComponentState) =>
			state.name.length !== 0
		);
	}
}
