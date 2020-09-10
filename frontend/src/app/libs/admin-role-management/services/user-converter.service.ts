import { Injectable } from '@angular/core';
import { UserDto } from '../../auth/models/user-dto';
import { User } from '../../auth/models/user';

@Injectable({
	providedIn: 'root',
})
export class UserConverter {
	public convertUsersFromDto(userDto: UserDto[]): User[] {
		return userDto.map(({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }));
	}

	public convertUserFromDto(user: UserDto): User {
		return (({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }))(user);
	}

	public convertUserToDto(user: User): UserDto {
		return (({ id, ...dto }: User) => ({ _id: id, ...dto }))(user);
	}
}
