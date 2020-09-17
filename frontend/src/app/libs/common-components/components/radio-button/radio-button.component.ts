import { Component, Input, OnInit } from '@angular/core';
import { ComponentTheme } from '../../shared/component-theme.enum';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public value: number;

	@Input()
	public name: string;

	@Input()
	public disabled: boolean = false;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
