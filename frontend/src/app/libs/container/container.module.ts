import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { ContainerStoreModule } from './store/store.module';
import { RouterModule } from '@angular/router';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LocalizationComponent } from './components/header/components/localization/localization.component';
import { AvatarComponent } from './components/header/components/avatar/avatar.component';
import { NotificationsComponent } from './components/header/components/notifications/notifications.component';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		ContainerComponent,
		HeaderComponent,
		FooterComponent,
		NotificationsComponent,
		LocalizationComponent,
		AvatarComponent
	],
	imports: [
		CommonComponentsModule,
		CommonModule,
		ContainerStoreModule,
		RouterModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ HttpClient ]
			}
		})
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
