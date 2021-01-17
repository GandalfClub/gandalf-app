import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalizationModule } from 'src/app/libs/container/components/localization/localization.module';
import { EventCreationComponent } from './event-creation.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BreadcrumbStoreModule } from '../breadcrumb/store/store.module';
import { EventCreationRoutingModule } from './event-creation-routing.module';
import { BreadcrumbTabModule } from '../breadcrumb-tab/breadcrumb-tab.module';
import { GeneralInfoPageModule } from './general-info-page/general-info-page.module';

@NgModule({
	declarations: [
		EventCreationComponent,
	],
	imports: [
		RouterModule,
		LocalizationModule,
		CommonModule,
		CommonComponentsModule,
		BreadcrumbStoreModule,
		BreadcrumbTabModule,
		GeneralInfoPageModule
	],
	exports: [EventCreationRoutingModule]
})
export class EventCreationModule { }
