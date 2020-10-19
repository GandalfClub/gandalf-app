import { NgModule } from '@angular/core';
import { TranslateModule, TranslateLoader, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocalizationComponent } from './localization.component';
import { MatMenuModule } from '@angular/material/menu';
import { CommonComponentsModule } from 'src/app/libs/common-components/common-components.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [ LocalizationComponent ],
	imports: [
		CommonComponentsModule,
		HttpClientModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [ HttpClient ]
			}
		}),
	],
	exports: [
		LocalizationComponent,
		TranslatePipe
	]
})
export class LocalizationModule {}
