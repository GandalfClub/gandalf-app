import { Component, Input, TemplateRef } from '@angular/core';
import { StateTemplateOfDemoComponent } from '../models/state-template-of-demo-component';
import { BoxSize } from '../models/box-size';

@Component({
  selector: 'app-component-demo',
  templateUrl: './component-demo.component.html',
  styleUrls: ['./component-demo.component.scss']
})
export class ComponentDemoComponent {

	@Input()
	public container: BoxSize;

	@Input()
	public name: string;

	@Input()
	public states: StateTemplateOfDemoComponent[];

	@Input()
	public componentTemplates: Array<TemplateRef<any>>;
}
