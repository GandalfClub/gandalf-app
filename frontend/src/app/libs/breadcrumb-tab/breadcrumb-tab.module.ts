import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbTabComponent } from './breadcrumb-tab.component';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventCreationModule } from '../event-creation/event-creation.module';
import { GeneralInfoPageComponent } from '../event-creation/general-info-page/general-info-page.component';

@NgModule({
	declarations: [
		BreadcrumbTabComponent,
/* 		GeneralInfoPageComponent */
	],
	imports: [
		CommonModule,
		CommonComponentsModule,
		BreadcrumbModule,
		// EventCreationModule
	],
	exports: [
		BreadcrumbTabComponent
	]
})
export class BreadcrumbTabModule { }
