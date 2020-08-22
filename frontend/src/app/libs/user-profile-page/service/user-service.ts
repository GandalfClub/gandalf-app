import { Injectable } from '@angular/core';
import { IUser } from '../model/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

const URL_PREFIX: string = '/api';
const ERROR_STATUS: number = 504;
const httpOptions: any = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class UserService {
	constructor(private http: HttpClient) {}

	private handleError(error: HttpErrorResponse): any {
		console.dir(error);

		if (error.message !== '') {
			if (!error.error) {
				return throwError(error);
			}
		}

		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
			return throwError(new Error('Произошла какая-то ошибка.'));
		} else {
			if (error.status === ERROR_STATUS || error.status === 0) {
				return throwError(new Error('Сервер не отвечает. Проверьте подключение к сети.'));
			}

			console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
		}

		return throwError(new Error('Ошибка сервера. Повторите запрос позже.'));
	}

	public updateUser(user: Partial<IUser>): Observable<any> {
		return this.http.post<IUser>(URL_PREFIX + '/users/update-user', user, httpOptions).pipe(catchError(this.handleError));
	}
}
