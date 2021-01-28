import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { newEventReducer } from './newEvent.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './newEvent.effects';

export const newEventFeatureKey: string = 'newEvent';

@NgModule({
	imports: [StoreModule.forFeature(newEventFeatureKey, newEventReducer), EffectsModule.forFeature([EventsEffects])],
})
export class NewEventStoreModule { }
