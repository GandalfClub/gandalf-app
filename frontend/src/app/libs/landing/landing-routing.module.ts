import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicEventsListComponent } from './components/public-events-list/public-events-list.component';

const routes: Routes = [{ path: '', component: PublicEventsListComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class LandingRoutingModule {}
