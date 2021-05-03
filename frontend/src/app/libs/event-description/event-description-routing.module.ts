import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventInfoGuard } from '../guards/event-info/event-info.guard';
import { EventComponent } from './components/event/event.component';

const routes: Routes = [
	{ path: ':id', component: EventComponent },
	{
		path: ':id/info',
		loadChildren: () => import('../event-info/event-info.module')
			.then((m: typeof import('../event-info/event-info.module')) => m.EventInfoModule),
		canActivateChild: [EventInfoGuard]
	},
	{
		path: '**',
		loadChildren: () =>
			import('../landing/landing.module').then((m: typeof import('../landing/landing.module')) => m.LandingModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventDescriptionRoutingModule { }
