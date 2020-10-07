import { Injectable } from '@angular/core';
import { Locale } from '../models/locale';
import { Localization } from '../models/localization';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

	private _currentLocale: Locale = 	{ name: 'EN', code: 'en' };
	private _localizations: Map<Locale, Localization> = new Map([
		[
			this._currentLocale,
			{
				sign_in: 'Sign In',
				sign_up: 'Sign Up',
				create_event: 'Create Event',
				events: 'Events',
				administration: 'Administration',
				log_off: 'Log OFF',
				account: 'Account',
				user_name: 'User name'
			}
		],
		[
			{
				name: 'RU',
				code: 'ru'
			},
			{
				sign_in: 'Войти',
				sign_up: 'Регистрация',
				create_event: 'Создать событие',
				events: 'События',
				administration: 'Администрирование',
				log_off: 'Выйти',
				account: 'Мой профиль',
				user_name: 'Имя пользователя'
			}
		]
	]);

	public get currentLocalization(): Localization {
		return this._localizations.get(this.currentLocale);
	}
	public get currentLocale(): Locale {
		return this._currentLocale;
	}
	public get locales(): Locale[] {
		return Array.from(this._localizations.keys());
	}

	constructor() {}

	public chooseCurrentLocale(locale: Locale): void {
		this._currentLocale = locale;
	}
}
