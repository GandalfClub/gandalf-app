import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UserProfilePageComponent } from './user-profile-page.component';
import { UserProfilePageRoutingModule } from './user-profile-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserStoreModule } from './store/store.module';

@NgModule({
	declarations: [UserProfilePageComponent],
	imports: [CommonComponentsModule, CommonModule, UserStoreModule, ReactiveFormsModule],
	exports: [UserProfilePageRoutingModule],
})
export class UserProfilePageModule {}
