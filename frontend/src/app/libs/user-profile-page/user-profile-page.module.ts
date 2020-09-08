import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { UserProfilePageComponent } from './user-profile-page.component';
import { UserProfilePageRoutingModule } from './user-profile-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { AuthStoreModule } from '../auth/store/store.module';

@NgModule({
	declarations: [UserProfilePageComponent],
	imports: [CommonComponentsModule, CommonModule, AuthStoreModule, ReactiveFormsModule],
	exports: [UserProfilePageRoutingModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class UserProfilePageModule {}
