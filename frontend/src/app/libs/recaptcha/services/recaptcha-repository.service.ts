import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recaptcha } from '../models/recaptcha';

@Injectable({
	providedIn: 'root',
})
export class RecaptchaRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

  	public getRecaptchaStatus(token): Observable<Recaptcha> {
		const url: string = this.API_URL + '/recaptcha/recaptcha-status';
	 	return this.http.post<Recaptcha>(url, {token});
	}
}
