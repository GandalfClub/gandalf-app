import { Component, Input } from '@angular/core';
import { ButtonType } from './models/button-type.enum';
import { ComponentTheme } from '../../shared/component-theme.enum';
import { ButtonColor } from './models/button-color.enum';
@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {

	public basicType: ButtonType = ButtonType.Basic;
	public outlinedType: ButtonType = ButtonType.Outlined;
	public flatType: ButtonType = ButtonType.Flat;

	@Input()
	public type: ButtonType = ButtonType.Basic;

	@Input()
	public color: ButtonColor;

	@Input()
	public theme: ComponentTheme = ComponentTheme.Light;

	@Input()
	public disabled: boolean = false;

	@Input()
	public disableRipple: boolean = false;

	@Input()
	public disableHover: boolean = false;

	@Input()
	public iconButton: boolean = false;

	public get isDarkTheme(): boolean {
		return this.theme === ComponentTheme.Dark;
	}
}
