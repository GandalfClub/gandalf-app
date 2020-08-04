import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePageComponent } from './user-profile-page.component';

const routes: Routes = [{ path: '', component: UserProfilePageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
})
export class UserProfilePageRoutingModule {}
