import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

	@Input()
	public isDark: boolean = false;

	@Input()
	public isDisabled: boolean = false;

	@Input()
	public type: string = 'basic';
}
