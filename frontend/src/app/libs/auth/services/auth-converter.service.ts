import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';
import { AuthResponse } from '../models/auth-response';

@Injectable({
	providedIn: 'root',
})
export class AuthConverter {
	public convertFromAuthResponse(authResponse: AuthResponse): User {
		return {
			email: authResponse.user.email,
			firstName: authResponse.user.firstName,
			isAdmin: authResponse.user.isAdmin,
			mobilePhone: authResponse.user.mobilePhone,
			password: authResponse.user.password,
			secondName: authResponse.user.secondName,
			id: authResponse.user._id,
		};
	}

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

	public convertToDto(user: User): Partial<UserDto> {
		return {
			_id: user.id,
			firstName: user.firstName,
			secondName: user.secondName,
			mobilePhone: user.mobilePhone,
		};
	}
}
