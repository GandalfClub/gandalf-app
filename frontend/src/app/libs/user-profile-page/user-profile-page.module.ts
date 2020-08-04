import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UserProfilePageComponent } from './user-profile-page.component';
import { UserProfilePageRoutingModule } from './user-profile-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [UserProfilePageComponent],
	imports: [CommonComponentsModule, CommonModule, ReactiveFormsModule],
	exports: [UserProfilePageRoutingModule],
})
export class UserProfilePageModule {}
