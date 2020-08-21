import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventsFeatureKey, eventsReducer, EventsEffects } from './events';

@NgModule({
	imports: [StoreModule.forFeature(eventsFeatureKey, eventsReducer), EffectsModule.forFeature([EventsEffects])],
})
export class EventsStoreModule {}
