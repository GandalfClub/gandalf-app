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
	public iconSize: ButtonIconSize;

	public get isIconExtraSmall(): boolean {
		return this.iconSize === ButtonIconSize.XS;
	}

	public get isIconSmall(): boolean {
		return this.iconSize === ButtonIconSize.S;
	}

	public get isIconMedium(): boolean {
		return this.iconSize === ButtonIconSize.M;
	}

	public get isIconLarge(): boolean {
		return this.iconSize === ButtonIconSize.L;
	}

}
