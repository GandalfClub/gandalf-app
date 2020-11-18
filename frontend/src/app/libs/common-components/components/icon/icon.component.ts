import { Component, Input, OnInit } from '@angular/core';
import { ButtonIconSize } from '../button/models/button-icons-size.eum';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class IconComponent {

	@Input()
	public icon: string;

	@Input()
	public size: ButtonIconSize = ButtonIconSize.S;

}
