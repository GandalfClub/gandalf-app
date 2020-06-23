import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container.component';
import { EffectsModule } from '@ngrx/effects';
import { SampleEffects } from './store/sample/sample.effects';
import { StoreModule } from '@ngrx/store';
import { sampleFeatureKey, reducer } from './store/sample/sample.reducer';
import { ContainerStoreModule } from './store/store.module';

@NgModule({
	declarations: [
		ContainerComponent
	],
	imports: [
		CommonModule,
		ContainerStoreModule
	],
	exports: [
		ContainerComponent
	]
})
export class ContainerModule { }
