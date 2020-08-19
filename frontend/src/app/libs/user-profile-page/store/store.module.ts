import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user/user.effects';
import { userFeatureKey, userReducer } from './user/user.reducer';

@NgModule({
	imports: [EffectsModule.forFeature([UserEffects]), StoreModule.forFeature(userFeatureKey, userReducer)],
})
export class UserStoreModule {}
