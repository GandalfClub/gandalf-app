import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { landingFeatureKey, eventsReducer } from './events/events.reducer';
import { EventsEffects } from './events/events.effects';

@NgModule({
	imports: [StoreModule.forFeature(landingFeatureKey, eventsReducer), EffectsModule.forFeature([EventsEffects])],
})
export class EventsStoreModule {}
