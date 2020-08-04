import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
	{
		path: 'landing',
		loadChildren: () =>
			import('./libs/landing/landing.module').then((m: typeof import('./libs/landing/landing.module')) => m.LandingModule),
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
=======
	{ path: 'login', component: LoginComponent },
	{
		path: 'profile',
		loadChildren: () =>
			import('./libs/user-profile-page/user-profile-page.module').then(
				(m: typeof import('./libs/user-profile-page/user-profile-page.module')) => m.UserProfilePageModule
>>>>>>> feat(gandalf/frontend): user profile page added
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
