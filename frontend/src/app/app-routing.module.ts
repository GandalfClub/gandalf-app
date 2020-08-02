import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () =>
			import('./libs/auth-page/auth-page.module').then((m: typeof import('./libs/auth-page/auth-page.module')) => m.AuthPageModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
