import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
	declarations: [SignInComponent],
	imports: [CommonComponentsModule, CommonModule],
	exports: [SignInRoutingModule],
})
export class SignInModule {}
