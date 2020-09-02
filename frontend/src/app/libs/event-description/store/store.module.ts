import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventReducer } from './event-description/event-description.reducer';
import { EventEffects } from './event-description/event-description.effects';

export const eventFeatureKey: string = 'event description';

@NgModule({
	imports: [StoreModule.forFeature(eventFeatureKey, eventReducer), EffectsModule.forFeature([EventEffects])],
})
export class EventDescriptionStoreModule {}
