import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class AuthConverter {
	public convertFromDto(userDto: UserDto): User {
		return {
			claims: userDto.claims,
			email: userDto.email,
			firstName: userDto.firstName,
			isAdmin: userDto.isAdmin,
			mobilePhone: userDto.mobilePhone,
			password: userDto.password,
			secondName: userDto.secondName,
			id: userDto._id,
		};
	}

	public convertToDto(user: User): Partial<UserDto> {
		return {
			_id: user.id,
			firstName: user.firstName,
			secondName: user.secondName,
			mobilePhone: user.mobilePhone,
			claims: user.claims
		};
	}
}
