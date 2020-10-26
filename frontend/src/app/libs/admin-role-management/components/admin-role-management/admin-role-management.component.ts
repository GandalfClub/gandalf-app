import { Component, OnInit } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';

@Component({
	selector: 'app-admin-role-management',
	templateUrl: './admin-role-management.component.html',
	styleUrls: ['./admin-role-management.component.scss'],
})
export class AdminRoleManagementComponent implements OnInit {
	constructor(private usersFacadeService: UsersFacadeService) {}

	public ngOnInit(): void {
		this.usersFacadeService.loadUsers();
	}
}
