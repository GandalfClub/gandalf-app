import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../auth/models/user-dto';
import { AuthConverter } from '../../auth/services/auth-converter.service';
import { User } from '../../auth/models/user';

@Injectable({
	providedIn: 'root',
})
export class UsersRepositoryService {
	private API_URL: string = '/api';

	constructor(
		private http: HttpClient,
		private authConverter: AuthConverter
		) {}

	public getUsers(): Observable<UserDto[]> {
		const url: string = this.API_URL + '/users';
		return this.http.get<UserDto[]>(url);
	}

	public updateUser(user: User): Observable<UserDto> {
		const userDto: Partial<UserDto> = this.authConverter.convertToDto(user);

		const url: string = this.API_URL + '/users/update-user';

		const updatedUser: Partial<UserDto> = {...userDto};
		delete updatedUser.password;
		delete updatedUser.isEventManager;
		delete updatedUser.checked;

		return this.http.post<UserDto>(url, updatedUser);
	}

	public removeUser(user: User): Observable<UserDto> {

		const url: string = this.API_URL + `/users/${user.id}`;

		return this.http.delete<UserDto>(url);
	}

	public removeSelectedUsers(usersId: string[]): Observable<string[]> {
		const url: string = this.API_URL + `/users/remove-users`;

		return this.http.post<string[]>(url, usersId);
	}

}
