import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRoleManagementComponent } from './components/admin-role-management/admin-role-management.component';

const routes: Routes = [{ path: '', component: AdminRoleManagementComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoleManagementRoutingModule {}
