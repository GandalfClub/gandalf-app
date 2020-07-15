import { sampleFeatureKey, reducer } from './sample/sample.reducer';
import { SampleEffects } from './sample/sample.effects';
import { authFeatureKey, authReducer } from './auth/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		EffectsModule.forFeature([SampleEffects]),
		StoreModule.forFeature(sampleFeatureKey, {
			sample: reducer
		}),
		StoreModule.forFeature(authFeatureKey, {auth: authReducer}),
	]
})
export class ContainerStoreModule { }
