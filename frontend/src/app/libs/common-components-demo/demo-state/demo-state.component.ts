import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-state',
  templateUrl: './demo-state.component.html',
  styleUrls: ['./demo-state.component.scss']
})
export class DemoStateComponent {

	@Input()
	public title: string;

	@Input()
	public isDark: boolean;
}
