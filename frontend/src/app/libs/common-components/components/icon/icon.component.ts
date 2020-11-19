import { Component, Input } from '@angular/core';
import { IconSize } from './models/icon-size.enum';

@Component({
	selector: 'app-icon',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class IconComponent {

	@Input()
	public icon: string;

	@Input()
	public size: IconSize = IconSize.S;

}
