import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../auth/models/user';

@Pipe({
	name: 'filter',
})
export class FilterPipe implements PipeTransform {
	public transform(user: User, searchText: string): User {
		if (searchText.length === 0) {
			return user;
		}
		if (user.email.toLowerCase().includes(searchText.toLowerCase())) {
			return user;
		}
		if (user.firstName.toLowerCase().includes(searchText.toLowerCase())) {
			return user;
		}
		if (user.secondName.toLowerCase().includes(searchText.toLowerCase())) {
			return user;
		}
	}
}
