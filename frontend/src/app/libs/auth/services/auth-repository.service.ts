import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { UserDto } from '../models/user-dto';
import { User } from '../models/user';

@Injectable({
	providedIn: 'root',
})
export class AuthRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

	public signIn(email: string, password: string): Observable<any> {
		const url: string = `${this.API_URL}/auth/signin`;
		return this.http.post<AuthResponse>(url, { email, password });
	}

	public signInByGithub(email: string, password: string): Observable<any> {
		const url: string = `${this.API_URL}/auth/login`;
		return this.http.post<AuthResponse>(url, { email, password });
	}

	public signUp(user: User): Observable<any> {
		const url: string = `${this.API_URL}/auth/signup`;
		return this.http.post<AuthResponse>(url, user);
	}

	public signOut(): Observable<any> {
		const url: string = `${this.API_URL}/auth/logout`;
		return this.http.post<AuthResponse>(url, { });
	}

	public updateUser(user: Partial<UserDto>): Observable<UserDto> {
		const url: string = this.API_URL + '/users/update-user';
		return this.http.post<UserDto>(url, user);
	}

  	public loadUser(): Observable<UserDto> {
  		const url: string = this.API_URL + '/users/self';
	 	 return this.http.get<UserDto>(url);
	}
}
