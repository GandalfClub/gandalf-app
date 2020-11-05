import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserDto } from '../models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class AuthConverter {
	public convertFromDto(user: UserDto): User {
		console.log('convert')
		return (({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }))(user);
	}

	public convertToDto(user: User): UserDto {
		return (({ id, ...dto }: User) => ({ _id: id, ...dto }))(user);
	}

	public convertUsersFromDto(userDto: UserDto[]): User[] {
		return userDto.map(({ _id, ...dto }: UserDto) => ({ id: _id, ...dto }));
	}
}
