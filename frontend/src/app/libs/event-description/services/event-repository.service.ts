import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventResponse } from '../models/event-response';

@Injectable({
	providedIn: 'root',
})
export class EventRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) {}

	public getEvent(id: string): Observable<any> {
		const url: string = `${this.API_URL}/publicevents/${id}`;
		return this.http.get<EventResponse>(url);
	}
}
