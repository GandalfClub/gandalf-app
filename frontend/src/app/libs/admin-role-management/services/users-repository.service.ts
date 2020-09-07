import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../models/user-dto';

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
}
