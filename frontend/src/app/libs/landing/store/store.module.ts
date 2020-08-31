import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventsReducer } from './events/events.reducer';
import { EventsEffects } from './events/events.effects';

export const landingFeatureKey: string = 'landing';
@NgModule({
	imports: [StoreModule.forFeature(landingFeatureKey, eventsReducer), EffectsModule.forFeature([EventsEffects])],
})
export class EventsStoreModule {}
