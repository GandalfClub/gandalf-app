import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { eventDescriptionReducer } from './event-description/event-description.reducer';
import { EventDescriptionEffects } from './event-description/event-description.effects';

export const eventDescriptionFeatureKey: string = 'event description';

@NgModule({
	imports: [
		StoreModule.forFeature(eventDescriptionFeatureKey, eventDescriptionReducer),
		EffectsModule.forFeature([EventDescriptionEffects]),
	],
})
export class EventDescriptionStoreModule {}
