import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { newEventReducer } from './newEvent.reducer';

export const newEventFeatureKey: string = 'newEvent';

@NgModule({
	imports: [StoreModule.forFeature(newEventFeatureKey, newEventReducer)],
})
export class NewEventStoreModule { }