import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewEvent } from '../store/model/model';

@Injectable({
	providedIn: 'root',
})
export class EventsRepositoryService {
	private API_URL: string = '/api';

	constructor(
		private http: HttpClient,
	) { }

	public createEvent(event: NewEvent): Observable<NewEvent> {
		const url: string = this.API_URL + '/events';
		return this.http.post<NewEvent>(url, event);
	}

}
