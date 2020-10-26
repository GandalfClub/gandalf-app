import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoleManagementRoutingModule } from './admin-role-management-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AdminRoleManagementComponent } from './components/admin-role-management/admin-role-management.component';
import { UserRoleTileComponent } from './components/user-role-tile/user-role-tile.component';
import { UsersRoleManagementPanelComponent } from './components/users-role-management-panel/users-role-management-panel.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { UsersStoreModule } from './store/store.module';

@NgModule({
	declarations: [AdminRoleManagementComponent, UserRoleTileComponent, UsersRoleManagementPanelComponent],
	imports: [CommonModule, AdminRoleManagementRoutingModule, CommonComponentsModule, UsersStoreModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AdminRoleManagementModule {}
