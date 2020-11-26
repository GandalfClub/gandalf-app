import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ComponentTheme } from 'src/app/libs/common-components/shared/component-theme.enum';
import { LanguageButton } from './models/localization-buttons.model';

@Component({
	selector: 'app-localization',
	templateUrl: './localization.component.html',
	styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent {

	public darkTheme: ComponentTheme = ComponentTheme.Dark;
	public languageButtons: LanguageButton[] = [
		{
			value: 'BUTTON.LANGUAGE-EN',
			url: 'assets/images/localization/icon-uk-flag.svg',
			locale: 'en'
		},
		{
			value: 'BUTTON.LANGUAGE-RU',
			url: 'assets/images/localization/icon-russian-flag.svg',
			locale: 'ru'
		}
	];

	constructor(public translateService: TranslateService) { }

}
