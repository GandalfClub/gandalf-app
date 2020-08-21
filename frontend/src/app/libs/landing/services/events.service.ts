import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../models/event';

const httpOptions: any = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
	}),
};

@Injectable({
	providedIn: 'root',
})
export class EventsRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

	public getEvents(): Observable<any> {
		const url: string = `${this.API_URL}/publicevents`;
		return this.http.get<Event[]>(url, httpOptions);
	}
}
