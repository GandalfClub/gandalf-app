import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
	declarations: [SignInComponent],
	imports: [CommonComponentsModule, CommonModule, TranslateModule, RecaptchaV3Module, RecaptchaModule, RecaptchaFormsModule ],
	exports: [SignInRoutingModule],
	providers: [
		{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcHvukZAAAAAL5zRwijNVtgSAE4nUqkFKZ7h1Qa' },
	  ],
})
export class SignInModule {}
