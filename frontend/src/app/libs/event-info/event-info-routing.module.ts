import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventInfoComponent } from './event-info.component';
import { TaskComponent } from './task/task.component';
import { TasksViewerComponent } from './tasks-viewer/tasks-viewer.component';

const routes: Routes = [
	{
		path: '', component: EventInfoComponent,
		children: [
			{
				path: 'tasks', component: TasksViewerComponent,
				children: [
					{ path: ':id', component: TaskComponent }
				]
			},
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventInfoRoutingModule { }
