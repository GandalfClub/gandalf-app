import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelGuard } from './libs/guards/admin-panel/admin-panel.guard';
import { TranslateModule } from '@ngx-translate/core';

export const routes: Routes = [
	{
		path: 'landing',
		loadChildren: () =>
			import('./libs/landing/landing.module').then((m: typeof import('./libs/landing/landing.module')) => m.LandingModule),
	},
	{
		path: 'event',
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
	{
		path: 'adminrolemanagement',
		loadChildren: () =>
			import('./libs/admin-role-management/admin-role-management.module').then(
				(m: typeof import('./libs/admin-role-management/admin-role-management.module')) => m.AdminRoleManagementModule
			),
		canLoad: [
			AdminPanelGuard
		]
	},
	{
		path: 'demo',
		loadChildren: () =>
			import('./libs/common-components-demo/common-components-demo.module').then(
				(m: typeof import('./libs/common-components-demo/common-components-demo.module')) => m.CommonComponentsDemoModule
			),
	},
	{
		path: 'create-event',
		loadChildren: () =>
			import('./libs/event-creation/event-creation.module').then(
				(m: typeof import('./libs/event-creation/event-creation.module')) => m.EventCreationModule
			),
	},
	{
		path: '**',
		redirectTo: '/landing'
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule, TranslateModule],
})
export class AppRoutingModule {}
