import { authFeatureKey, authReducer } from './auth/auth.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth/auth.effects';
import { EffectsModule } from '@ngrx/effects';
@NgModule({
	imports: [StoreModule.forFeature(authFeatureKey, authReducer), EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule {}
