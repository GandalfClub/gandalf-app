import { browser, by, element } from 'protractor';

export class AppPage {
	// tslint:disable-next-line: promise-function-async
	public navigateTo(): Promise<unknown> {
		return browser.get(browser.baseUrl) as Promise<unknown>;
	}

	// tslint:disable-next-line: promise-function-async
	public getTitleText(): Promise<string> {
		return element(by.css('app-root .content span')).getText() as Promise<string>;
	}
}
