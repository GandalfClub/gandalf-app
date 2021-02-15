import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecaptchaStoreModule } from './store/store.module';
import { HttpClientModule } from '@angular/common/http';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RecaptchaStoreModule,
		HttpClientModule,
		RecaptchaV3Module
	],
	providers: [{ provide: RECAPTCHA_V3_SITE_KEY, useValue: '6LcHvukZAAAAAL5zRwijNVtgSAE4nUqkFKZ7h1Qa' }],
})
export class RecaptchaModule { }
