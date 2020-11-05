<<<<<<< Updated upstream
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './store/sample/sample.reducer';
import { selectSampleState } from './store/sample/sample.selectors';
=======
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { Locale } from './models/locale';
import { UserService } from './services/user.service';
>>>>>>> Stashed changes

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

<<<<<<< Updated upstream
	constructor(private store: Store<State>) { }

	public ngOnInit(): void {
		this.store.select(selectSampleState).subscribe((state: State) => {
			console.log(state, 'store works');
		});
=======
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
>>>>>>> Stashed changes
	}
}
