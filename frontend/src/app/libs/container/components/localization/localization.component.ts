import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';

@Component({
	selector: 'app-localization',
	templateUrl: './localization.component.html',
	styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;

	constructor(public translateService: TranslateService) {}
}
