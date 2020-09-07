import { Component } from '@angular/core';
import { UsersFacadeService } from '../../store/users/users.facade';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
	constructor(private usersFacadeService: UsersFacadeService) {}

	public get users$(): Observable<User[]> {
		return this.usersFacadeService.usersValue$;
	}
}
