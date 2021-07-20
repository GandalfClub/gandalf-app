import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../common-components/components/tasks-creator/models/task';
import { TasksTypes } from '../../common-components/components/tasks-creator/models/tasks-creator';
import { of } from 'rxjs/internal/observable/of';
import { EventDto } from '../../landing/models/event-dto';
import { Event } from '../../landing/models/event';
import { GeneralEventInfo } from '../store/model/model';

@Injectable({
	providedIn: 'root',
})
export class EventsRepositoryService {
	private API_URL: string = '/api';

	constructor(
		private http: HttpClient,
	) { }

	public createEvent(title: string): Observable<EventDto> {
		const url = `${this.API_URL}/events`;
		return this.http.post<EventDto>(url, { title });
	}

	public updateEvent(event: GeneralEventInfo, id: string): Observable<Event> {
		const url = `${this.API_URL}/events/update-event`;
		const params = { id };
		return this.http.post<Event>(url, event, { params });
	}

	public loadEvent(id: string): Observable<Event> {
		const url = `${this.API_URL}/events/event/`;
		const params = { id };
		return this.http.get<Event>(url, { params });
	}

	public createTaskEvent(task: Task): Observable<Task> {
		const url: string = this.API_URL + '/tasks'; // todo backend url
		return this.http.post<Task>(url, task);
	}

	public loadTasks(): Observable<Map<Symbol, Task>> {

		// todo remove after backend implementation
		const key1: Symbol = Symbol('id');
		const key2: Symbol = Symbol('id');
		const key3: Symbol = Symbol('id');

		// todo remove after backend implementation
		const testTasksState: Map<Symbol, Task> = new Map<Symbol, Task>([
			[
				key1,
				{
					id: key1,
					taskName: 'task 1',
					taskType: TasksTypes.Single,
					mentorCheck: false,
					maxScore: 100,
					question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
					answers: new Set([
						{
							label: 'label',
							isCorrect: false,
						},
						{
							label: 'Some label12',
							isCorrect: true,
						},
					]),
				}
			],
			[
				key2,
				{
					id: key2,
					taskName: 'task 2',
					taskType: TasksTypes.Coding,
					mentorCheck: true,
					maxScore: 300,
					question: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur assumenda esse iure laboriosam natus non porro quam rem sed similique?</p>',
					code: `function a() {\n console.log(\'Hello world\');\n}`,
				}
			],
			[
				key3,
				{
					id: key3,
					taskName: 'task 3',
					taskType: TasksTypes.Multiple,
					mentorCheck: false,
					maxScore: 60,
					question: '<p>Question text3</p>',
					answers: new Set([
						{
							label: 'Some label31',
							isCorrect: false,
						},
						{
							label: 'Some label32',
							isCorrect: true,
						},
					]),
				}
			]
		]);

		const url: string = this.API_URL + '/tasks'; // todo backend url

		// return this.http.get<Map<Symbol, ITask>>(url);
		return of(testTasksState);
	}
}
