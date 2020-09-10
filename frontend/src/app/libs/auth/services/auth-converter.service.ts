import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class AuthConverter {
	public convertFromDto(userDto: UserDto): User {
		return {
			...userDto,
			id: userDto._id,
		};
	}

	public convertToDto(user: User): UserDto {
		return {
			...user,
			_id: user.id,
		};
	}
}
