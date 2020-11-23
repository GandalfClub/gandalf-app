import { containerFeatureKey, containerReducer } from './container/container.reducer';
import { ContainerEffects } from './container/container.effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		StoreModule.forFeature(containerFeatureKey, containerReducer),
		EffectsModule.forFeature([ContainerEffects])
	],

})
export class ContainerStoreModule { }
