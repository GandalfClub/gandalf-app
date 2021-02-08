import { Component, OnDestroy, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthFacadeService } from '../auth/store/auth/auth.facade';
import { Locale } from './models/locale';
import { UserService } from './services/user.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ContainerFacadeService } from './services/container-facade.service';

@Component({
	selector: 'app-container',
	templateUrl: './container.component.html',
	styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy, AfterViewChecked {
	 public hideHeader$: Observable<boolean> = this.containerFacadeService.hideHeader;
	 public hideFooter$: Observable<boolean> = this.containerFacadeService.hideFooter;
	 public destroy$: Subject<boolean> = new Subject();

	constructor(
		public translateService: TranslateService,
		private userService: UserService,
		private containerFacadeService: ContainerFacadeService,
		private changeDedectionRef: ChangeDetectorRef,
		public router: Router,
		private authFacadeService: AuthFacadeService) {
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

	public ngAfterViewChecked(): void {
		 this.changeDedectionRef.detectChanges();
	}

	public ngOnDestroy(): void {
		this.userService.unsubscribeUser();
	}

}
