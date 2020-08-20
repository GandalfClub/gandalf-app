import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> 121488751ca070a866424e212c153f9d77227fa6
	{ path: 'login', component: LoginComponent },
	{
		path: 'profile',
		loadChildren: () =>
			import('./libs/user-profile-page/user-profile-page.module').then(
				(m: typeof import('./libs/user-profile-page/user-profile-page.module')) => m.UserProfilePageModule
<<<<<<< HEAD
>>>>>>> feat(gandalf/frontend): user profile page added
=======
>>>>>>> 121488751ca070a866424e212c153f9d77227fa6
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
