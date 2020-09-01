import { Injectable } from '@angular/core';
import { IUser } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const URL_PREFIX: string = '/api';
const ERROR_STATUS: number = 504;

@Injectable({
	providedIn: 'root',
})
export class UserRepository {
	constructor(private http: HttpClient) {}

	public updateUser(user: Partial<IUser>): Observable<any> {
		return this.http.post<IUser>(URL_PREFIX + '/users/update-user', user);
	}
}
