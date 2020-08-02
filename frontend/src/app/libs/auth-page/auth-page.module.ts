import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AuthPageComponent } from './auth-page.component';
import { AuthPageRoutingModule } from './auth-page-routing.module';

@NgModule({
	declarations: [AuthPageComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [AuthPageRoutingModule],
})
export class AuthPageModule {}
