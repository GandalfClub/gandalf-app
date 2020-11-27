import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/events-page/events-page.component';

const routes: Routes = [{ path: '', component: LandingPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class LandingRoutingModule {}
