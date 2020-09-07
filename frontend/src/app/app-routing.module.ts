import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'landing',
		loadChildren: () =>
			import('./libs/landing/landing.module').then((m: typeof import('./libs/landing/landing.module')) => m.LandingModule),
	},
	{
		path: 'eventdescription',
		loadChildren: () =>
			import('./libs/event-description/event-description.module').then(
				(m: typeof import('./libs/event-description/event-description.module')) => m.EventDescriptionModule
			),
	},
	{
		path: 'signin',
		loadChildren: () =>
			import('./libs/auth-pages/sign-in/sign-in.module').then(
				(m: typeof import('./libs/auth-pages/sign-in/sign-in.module')) => m.SignInModule
			),
	},
	{
		path: 'signup',
		loadChildren: () =>
			import('./libs/auth-pages/sign-up/sign-up.module').then(
				(m: typeof import('./libs/auth-pages/sign-up/sign-up.module')) => m.SignUpModule
			),
	},
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
