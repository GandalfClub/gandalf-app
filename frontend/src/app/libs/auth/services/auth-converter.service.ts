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
			_id: user.id,
			firstName: user.firstName,
			secondName: user.secondName,
			mobilePhone: user.mobilePhone,
			claims: user.claims,
			email: user.email,
			isAdmin: user.isAdmin,
			photoUrl: user.photoUrl,
			displayName: user.displayName,
		};
	}
}
