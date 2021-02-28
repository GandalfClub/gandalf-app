import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { newEventReducer } from './event.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './event.effects';

export const newEventFeatureKey: string = 'events';

@NgModule({
	imports: [StoreModule.forFeature(newEventFeatureKey, newEventReducer), EffectsModule.forFeature([EventsEffects])],
})
export class EventStoreModule { }
