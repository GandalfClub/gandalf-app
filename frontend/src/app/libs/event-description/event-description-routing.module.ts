import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventDescriptionComponent } from './components/event-description/event-description.component';

const routes: Routes = [{ path: '', component: EventDescriptionComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventDescriptionRoutingModule {}
