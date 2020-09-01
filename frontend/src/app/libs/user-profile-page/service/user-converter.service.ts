import { Injectable } from '@angular/core';
import { User } from '../../auth/models/user';
import { UserDto } from '../model/user-dto';
import { UserChanges } from '../model/user-changes';

@Injectable({
	providedIn: 'root',
})
export class UserConverter {
	public convertFromDto(userDto: UserDto): User {
		const user: User = { id: userDto._id, ...userDto };
		delete user['_id'];
		return user;
	}

	public convertToDto(user: User): UserChanges {
		const userDto: UserDto = { _id: user.id, ...user };
		delete userDto['id'];
		delete userDto.isAdmin;
		delete userDto.email;
		delete userDto.password;
		return userDto;
	}
}
