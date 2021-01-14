import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreationComponent } from './event-creation.component';

const routes: Routes = [{
	path: '', component: EventCreationComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	// exports: [RouterModule],
})
export class EventCreationRoutingModule { }
