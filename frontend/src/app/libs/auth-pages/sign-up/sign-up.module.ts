import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { RecaptchaModule } from '../../recaptcha/recaptcha.module';
import { StoreModule } from '@ngrx/store';
import { NgxMaskModule } from 'ngx-mask';


@NgModule({
	declarations: [SignUpComponent],
	imports: [
		CommonComponentsModule,
		CommonModule,
		RecaptchaModule,
		StoreModule,
		NgxMaskModule.forRoot({
			showMaskTyped : true,
		  })
	],
	exports: [SignUpRoutingModule],
})
export class SignUpModule {}
