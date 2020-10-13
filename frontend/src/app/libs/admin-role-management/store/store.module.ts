import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './users/users.effects';
import { usersReducer } from './users/users.reducer';

export const adminRoleManagementFeatureKey: string = 'admin role management';

@NgModule({
	imports: [StoreModule.forFeature(adminRoleManagementFeatureKey, usersReducer), EffectsModule.forFeature([UsersEffects])],
})
export class UsersStoreModule {}
