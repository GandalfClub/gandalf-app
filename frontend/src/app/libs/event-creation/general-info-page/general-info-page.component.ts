import { Component } from '@angular/core';
import { ComponentTheme } from '../../common-components/shared/component-theme.enum';

@Component({
	selector: 'app-general-info',
	templateUrl: './general-info-page.component.html',
	styleUrls: ['./general-info-page.component.scss'],
})
export class GeneralInfoPageComponent  {
	public lightTheme: ComponentTheme = ComponentTheme.Light;
}
