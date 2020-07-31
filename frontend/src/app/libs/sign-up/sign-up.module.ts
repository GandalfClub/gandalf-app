import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { SignUpComponent } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
	declarations: [SignUpComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [SignUpRoutingModule],
})
export class SignUpModule {}
