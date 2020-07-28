import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/auth-response';

export const httpOptions: {} = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	private API_URL: string = '/api';

	constructor(private http: HttpClient) { }

	public logIn(email: string, password: string): Observable<any> {
		const url: string = `${this.API_URL}/auth/signin`;
		return this.http.post<AuthResponse>(url, { email, password }, httpOptions);
	}

	public logInByGithub(email: string, password: string): Observable<any> {
		const url: string = `${this.API_URL}/auth/login`;
		return this.http.post<AuthResponse>(url, { email, password }, httpOptions);
	}

	public signUp(email: string, password: string): Observable<any> {
		const url: string = `${this.API_URL}/auth/signup`;
		return this.http.post<AuthResponse>(url, { email, password }, httpOptions);
	}
}
