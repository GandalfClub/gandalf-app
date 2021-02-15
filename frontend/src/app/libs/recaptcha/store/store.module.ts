import { recaptchaFeatureKey, recaptchaReducer } from './recaptcha/recaptcha.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RecaptchaEffects } from './recaptcha/recaptcha.effects';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
	imports: [
		StoreModule.forFeature(recaptchaFeatureKey, recaptchaReducer),
		EffectsModule.forFeature([RecaptchaEffects]),
	]
})
export class RecaptchaStoreModule { }
