import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-components-demo-group',
  templateUrl: './components-demo-group.component.html',
  styleUrls: ['./components-demo-group.component.scss']
})
export class ComponentsDemoGroupComponent {

	@Input()
	public isDark: boolean = false;

	@Input()
	public groupName: string;
}
