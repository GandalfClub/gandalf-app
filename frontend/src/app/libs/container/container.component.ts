import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locale } from './models/locale';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent {
	public hideHeader: boolean = false;
	public hideFooter: boolean = false;

	constructor(public translateService: TranslateService) {
		translateService.addLangs([Locale.English, Locale.Russian]);
		translateService.setDefaultLang(Locale.English);
		const browserLang: string = translateService.getBrowserLang();
		const browserLangRegExp: RegExp = new RegExp(`${Locale.Russian}|${Locale.English}`);
		translateService.use(browserLang.match(browserLangRegExp) ? browserLang : Locale.English);
	}
}
