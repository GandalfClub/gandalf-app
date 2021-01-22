import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationModule } from 'src/app/libs/container/components/localization/localization.module';
import { EventCreationComponent } from './event-creation.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BreadcrumbStoreModule } from '../common-components/components/breadcrumb/store/store.module';
import { EventCreationRoutingModule } from './event-creation-routing.module';
import { GeneralInfoPageComponent } from './general-info-page/general-info-page.component';
import { BreadcrumbModule } from '../common-components/components/breadcrumb/breadcrumb.module';

@NgModule({
	declarations: [
		EventCreationComponent,
		GeneralInfoPageComponent,
	],
	imports: [
		RouterModule,
		LocalizationModule,
		CommonModule,
		CommonComponentsModule,
		BreadcrumbStoreModule,
		BreadcrumbModule,
	],
	exports: [EventCreationRoutingModule]
})
export class EventCreationModule { }
