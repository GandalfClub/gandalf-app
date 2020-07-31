import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './libs/login/login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{
		path: 'signup',
		loadChildren: () => import('./libs/sign-up/sign-up.module').then((m: typeof import('./libs/sign-up/sign-up.module')) => m.SignUpModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
