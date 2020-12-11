import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { EventDescriptionPanelComponent } from './components/event-description-panel/event-description-panel.component';

const routes: Routes = [{
	path: ':id', component: EventComponent, data: { breadcrumb: 'Events' }
}];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventDescriptionRoutingModule { }
