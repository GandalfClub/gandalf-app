import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { SignInRoutingModule } from './sign-in-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [SignInComponent],
	imports: [CommonComponentsModule, CommonModule, TranslateModule],
	exports: [SignInRoutingModule],
})
export class SignInModule {}
