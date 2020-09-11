import { Component, Input } from '@angular/core';
import { ButtonType } from '../../models/button-type.enum';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

	public basicType: ButtonType = ButtonType.Basic;
	public outlinedType: ButtonType = ButtonType.Outlined;
	public flatType: ButtonType = ButtonType.Flat;

	@Input()
	public type: ButtonType = ButtonType.Basic;

	@Input()
	public isDark: boolean = false;

	@Input()
	public isDisabled: boolean = false;
}
