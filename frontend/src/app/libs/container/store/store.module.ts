import { sampleFeatureKey, reducer } from './sample/sample.reducer';
import { SampleEffects } from './sample/sample.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { reducerSignIn, signInPageFeatureKey } from './sign-in-page/sign-in-page.reducer';

@NgModule({
	imports: [
		EffectsModule.forFeature([SampleEffects]),
		StoreModule.forFeature(sampleFeatureKey, {
			sample: reducer,
			[signInPageFeatureKey]: reducerSignIn
		}),
	]
})
export class ContainerStoreModule { }
