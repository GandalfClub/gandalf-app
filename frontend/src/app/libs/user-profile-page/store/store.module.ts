import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UserEffects } from './user/user.effects';
import { userProfileFeatureKey, userReducer } from './user/user.reducer';

@NgModule({
	imports: [EffectsModule.forFeature([UserEffects]), StoreModule.forFeature(userProfileFeatureKey, userReducer)],
})
export class UserStoreModule {}
