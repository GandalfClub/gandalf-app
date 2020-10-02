import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventReducer } from './event/event.reducer';
import { EventEffects } from './event/event.effects';

export const eventDescriptionFeatureKey: string = 'event description';

@NgModule({
	imports: [StoreModule.forFeature(eventDescriptionFeatureKey, eventReducer), EffectsModule.forFeature([EventEffects])],
})
export class EventStoreModule {}
