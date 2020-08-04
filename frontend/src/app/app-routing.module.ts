import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './libs/login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'profile',
		loadChildren: () =>
			import('./libs/user-profile-page/user-profile-page.module').then(
				(m: typeof import('./libs/user-profile-page/user-profile-page.module')) => m.UserProfilePageModule
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
