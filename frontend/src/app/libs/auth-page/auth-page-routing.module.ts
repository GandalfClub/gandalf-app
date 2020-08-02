import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPageComponent } from './auth-page.component';

const routes: Routes = [
	{ path: 'signin', component: AuthPageComponent },
	{ path: 'signup', component: AuthPageComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class AuthPageRoutingModule {}
