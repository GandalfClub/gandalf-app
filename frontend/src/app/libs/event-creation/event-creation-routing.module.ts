import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreationComponent } from './event-creation.component';

const routes: Routes = [{
	path: ':id', component: EventCreationComponent
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class EventCreationRoutingModule { }
