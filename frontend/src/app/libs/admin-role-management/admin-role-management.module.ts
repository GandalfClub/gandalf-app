import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoleManagementRoutingModule } from './admin-role-management-routing.module';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AdminRoleManagementComponent } from './components/admin-role-management/admin-role-management.component';
import { UserComponent } from './components/user/user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/interceptors/auth.interceptor';
import { UsersStoreModule } from './store/store.module';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
	declarations: [AdminRoleManagementComponent, UserComponent, UserListComponent, FilterPipe],
	imports: [CommonModule, AdminRoleManagementRoutingModule, CommonComponentsModule, UsersStoreModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class AdminRoleManagementModule {}
