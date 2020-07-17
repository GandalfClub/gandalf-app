import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { SignInComponent } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';
import { EffectsModule } from '@ngrx/effects';
import {
	SessionEffects,
	sessionFeatureKey,
	sessionStateReducer,
} from '../container/store';
import { StoreModule } from '@ngrx/store';

@NgModule({
	declarations: [SignInComponent],
	imports: [
		CommonComponentsModule,
		CommonModule,
		EffectsModule.forFeature([SessionEffects]),
		StoreModule.forFeature(sessionFeatureKey, sessionStateReducer),
	],
	exports: [SignInRoutingModule],
})
export class SignInModule {}
