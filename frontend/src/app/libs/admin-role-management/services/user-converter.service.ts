import { Injectable } from '@angular/core';
import { UserDto } from '../../auth/models/user-dto';
import { User } from '../../auth/models/user';

@Injectable({
	providedIn: 'root',
})
export class UserConverter {
	public convertFromDto(userDto: UserDto[]): User[] {
		return userDto.map(({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }));
	}
	// public convertToDto(user: User[]): UserDto[] {
	// 	return user.map(({ id, ...dto }: User) => ({ _id: id, ...dto }));
	// }

	// public convertToDto(user: User): Partial<UserDto> {
	// 	return {
	// 		_id: user.id,
	// 		claims: user.claims,
	// 	};
	// }
}
