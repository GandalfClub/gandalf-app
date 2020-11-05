import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { Locale } from './models/locale';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
	public hideHeader: boolean = false;
	public hideFooter: boolean = false;

	constructor (
		public translateService: TranslateService,
		private userService: UserService,
		private authFacadeService: AuthFacadeService
	) {
		translateService.addLangs([Locale.English, Locale.Russian]);
		translateService.setDefaultLang(Locale.English);
		const browserLang: string = translateService.getBrowserLang();
		const browserLangRegExp: RegExp = new RegExp(`${Locale.Russian}|${Locale.English}`);
		translateService.use(browserLang.match(browserLangRegExp) ? browserLang : Locale.English);
	}

	public ngOnInit(): void {
		this.authFacadeService.loadUser();
		this.userService.subscribeUser();
	}

	public ngOnDestroy(): void {
		this.userService.unsubscribeUser();
	}
}
