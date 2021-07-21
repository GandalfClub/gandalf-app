import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventInfoRoutingModule } from './event-info-routing.module';
import { EventInfoComponent } from './event-info.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { TasksViewerComponent } from './tasks-viewer/tasks-viewer.component';
import { BreadcrumbStoreModule } from '../common-components/components/breadcrumb/store/store.module';
import { BreadcrumbModule } from '../common-components/components/breadcrumb/breadcrumb.module';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { EventInfoStoreModule } from './store/store.module';

@NgModule({
	declarations: [
		EventInfoComponent,
		TasksViewerComponent,
		TaskComponent,
		TaskListComponent
	],
	imports: [
		CommonModule,
		CommonComponentsModule,
		TranslateModule,
		BreadcrumbStoreModule,
		BreadcrumbModule,
		EventInfoStoreModule,
		EventInfoRoutingModule,
	],
})
export class EventInfoModule { }
