import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../auth/models/user-dto';

@Injectable({
	providedIn: 'root',
})
export class UsersRepositoryService {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

	public getUsers(): Observable<UserDto[]> {
		const url: string = this.API_URL + '/users';
		return this.http.get<UserDto[]>(url);
	}

	public updateUser(user: Partial<UserDto>): Observable<UserDto> {
		const url: string = this.API_URL + '/users/update-user';

		const updatedUser: Partial<UserDto> = {...user};
		delete updatedUser.password;
		delete updatedUser.isEventManager;

		return this.http.post<UserDto>(url, updatedUser);
	}

	public removeUser(user: Partial<UserDto>): Observable<UserDto> {
		const url: string = this.API_URL + `/users/${user._id}`;

		return this.http.delete<UserDto>(url);
	}

}