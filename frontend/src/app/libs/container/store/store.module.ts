import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sessionFeatureKey, sessionStateReducer } from './session/session.reducer';
import { SessionEffects } from './session/session.effects';

@NgModule({
	imports: [EffectsModule.forFeature([SessionEffects]), StoreModule.forFeature(sessionFeatureKey, sessionStateReducer)],
})
export class ContainerStoreModule {}
