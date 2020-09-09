import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-group',
  templateUrl: './demo-group.component.html',
  styleUrls: ['./demo-group.component.scss']
})
export class DemoGroupComponent {

	@Input()
	public title: string;
}
