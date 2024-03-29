import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { EventCreationComponent } from './event-creation.component';
import { CommonModule } from '@angular/common';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { BreadcrumbStoreModule } from '../common-components/components/breadcrumb/store/store.module';
import { EventCreationRoutingModule } from './event-creation-routing.module';
import { GeneralInfoPageComponent } from './general-info-page/general-info-page.component';
import { BreadcrumbModule } from '../common-components/components/breadcrumb/breadcrumb.module';
import { TasksCreatorPageComponent } from './tasks-creator-page/tasks-creator-page.component';
import { TasksCreatorModule } from '../common-components/components/tasks-creator/tasks-creator.module';

@NgModule({
	declarations: [
		EventCreationComponent,
		GeneralInfoPageComponent,
		TasksCreatorPageComponent,
	],
	imports: [
		RouterModule,
		TranslateModule,
		CommonModule,
		CommonComponentsModule,
		BreadcrumbStoreModule,
		BreadcrumbModule,
		TasksCreatorModule,
	],
	exports: [EventCreationRoutingModule],
})
export class EventCreationModule {
}
