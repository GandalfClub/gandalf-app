import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from 'src/app/libs/breadcrumb/breadcrumb.component';
import { LocalizationModule } from 'src/app/libs/container/components/localization/localization.module';
import { EventCreationComponent } from './event-creation.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { EventStoreModule } from '../event-description/store/store.module';
import { BreadcrumbStoreModule } from '../breadcrumb/store/store.module';
import { BreadcrumbModule } from '../breadcrumb/breadcrumb.module';
import { EventCreationRoutingModule } from './event-creation-routing.module';

@NgModule({
	declarations: [
		EventCreationComponent,
	],
	imports: [
		RouterModule,
		LocalizationModule,
		CommonModule,
		CommonComponentsModule,
		EventStoreModule,
		BreadcrumbStoreModule,
		BreadcrumbModule,
	],
	exports: [EventCreationRoutingModule]
})
export class EventCreationModule { }
