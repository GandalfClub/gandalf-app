import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class UserConverter {
	public convertFromDto(userDto: UserDto[]): User[] {
		return userDto.map(({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }));
	}

	// public convertToDto(user: User): Partial<UserDto> {
	// 	return {
	// 		_id: user.id,
	// 		claims: user.claims,
	// 	};
	// }
}
