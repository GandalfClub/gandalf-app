import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventsResponse } from '../models/events-response';

@Injectable({
	providedIn: 'root',
})
export class EventsRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

	public getEvents(): Observable<any> {
		const url: string = `${this.API_URL}/publicevents`;
		return this.http.get<EventsResponse>(url);
	}
}
