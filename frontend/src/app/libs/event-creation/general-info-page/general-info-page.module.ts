import { NgModule } from '@angular/core';
import { LocalizationModule } from 'src/app/libs/container/components/localization/localization.module';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { GeneralInfoPageComponent } from './general-info-page.component';

@NgModule({
	declarations: [
		GeneralInfoPageComponent
	],
	imports: [
		LocalizationModule,
		CommonModule,
		CommonComponentsModule,
	],
	exports: [GeneralInfoPageComponent]
})
export class GeneralInfoPageModule { }
