import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../auth/models/user';

const URL_PREFIX: string = '/api';

@Injectable({
	providedIn: 'root',
})
export class UserRepository {
	constructor(private http: HttpClient) {}

	public updateUser(user: Partial<User>): Observable<User> {
		return this.http.post<User>(URL_PREFIX + '/users/update-user', user);
	}
}
