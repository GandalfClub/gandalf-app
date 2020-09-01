import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';
import { UserDto } from '../model/user-dto';
import { UserChanges } from '../model/user-changes';

@Injectable({
	providedIn: 'root',
})
export class UserConverter {
	public convertFromDto(userDto: UserDto): User {
		return {
			email: userDto.email,
			firstName: userDto.firstName,
			isAdmin: userDto.isAdmin,
			mobilePhone: userDto.mobilePhone,
			password: userDto.password,
			secondName: userDto.secondName,
			id: userDto._id,
		};
	}

	public convertToDto(user: User): UserChanges {
		return {
			_id: user.id,
			firstName: user.firstName,
			secondName: user.secondName,
			mobilePhone: user.mobilePhone,
		};
	}
}
