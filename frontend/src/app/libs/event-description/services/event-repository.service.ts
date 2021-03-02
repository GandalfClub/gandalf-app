import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventDto } from '../../landing/models/event-dto';
import { EventParticipation } from '../../landing/models/event-participation.class';

@Injectable({
	providedIn: 'root',
})
export class EventRepository {
	private API_URL: string = '/api';

	constructor(private http: HttpClient) { }

	public getEvent(id: string): Observable<EventDto> {
		const url: string = `${this.API_URL}/publicevents/${id}`;
		return this.http.get<EventDto>(url);
	}

	public regForEvent(participation: EventParticipation): Observable<EventParticipation> {
		const url: string = `${this.API_URL}/events/`;
		return this.http.post<EventParticipation>(url, participation);
	}
}
