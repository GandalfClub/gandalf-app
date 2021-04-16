import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EventInfoEffects } from './event-info.effects';
import { eventInfoReducer } from './event-info.reducer';

export const eventInfoFeatureKey: string = 'event info';

@NgModule({
	imports: [
		StoreModule.forFeature(eventInfoFeatureKey, eventInfoReducer),
		EffectsModule.forFeature([EventInfoEffects])
	],
})
export class EventInfoStoreModule { }
