import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-component-demo',
  templateUrl: './component-demo.component.html',
  styleUrls: ['./component-demo.component.scss']
})
export class ComponentDemoComponent {

	@Input()
	public containerWidth: string;

	@Input()
	public containerHeight: string;

	@Input()
	public componentName: string;

	@Input()
	public componentStateNames: string[];

	@Input()
	public componentTemplates: string[];
}
