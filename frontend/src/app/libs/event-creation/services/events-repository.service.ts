import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GeneralEvent } from '../store/model/model';
import { ITask } from '../../common-components/components/tasks-creator/models/task';

@Injectable({
	providedIn: 'root',
})
export class EventsRepositoryService {
	private API_URL: string = '/api';

	constructor(
		private http: HttpClient,
	) { }

	public createGeneralEvent(generalEvent: GeneralEvent): Observable<GeneralEvent> {
		const url: string = this.API_URL + '/events';
		return this.http.post<GeneralEvent>(url, generalEvent);
	}

  public createTaskEvent(task: ITask): Observable<ITask> {
    const url: string = this.API_URL + '/tasks'; // todo backend url
    return this.http.post<ITask>(url, task);
  }
}
