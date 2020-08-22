import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
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
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
