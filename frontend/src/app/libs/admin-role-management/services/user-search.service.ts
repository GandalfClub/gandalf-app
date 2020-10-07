import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';

@Injectable({
	providedIn: 'root',
})
export class UserSearchService {
	public userSearch(users: User[], searchText: string): User[] {
		if (searchText !== '' && users.length !== 0) {
			return users.filter(
				(user: User) =>
					user.email.toLowerCase().includes(searchText.toLowerCase()) ||
					user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
					user.secondName.toLowerCase().includes(searchText.toLowerCase())
			);
		} else {
			return users;
		}
	}
}
