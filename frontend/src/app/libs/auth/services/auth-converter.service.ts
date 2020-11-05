import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class AuthConverter {
<<<<<<< Updated upstream
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
=======
	public convertFromDto(user: UserDto): User {
		console.log('convert')
		return (({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }))(user);
>>>>>>> Stashed changes
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
