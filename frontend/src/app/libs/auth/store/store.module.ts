import { authFeatureKey, authReducer } from './auth/auth.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
	imports: [
		StoreModule.forFeature(authFeatureKey, authReducer),
	]
})
export class ContainerStoreModule { }
