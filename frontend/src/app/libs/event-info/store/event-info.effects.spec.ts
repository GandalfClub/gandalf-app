import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { EventInfoService } from '../services/event-info.service';
import { FetchTasksError, FetchTasksSuccess } from './event-info.actions';
import { EventInfoEffects } from './event-info.effects';

describe('EventInfoEffects', () => {
	let eventInfoService: EventInfoService;
	let effects: EventInfoEffects;
	const actions$: Observable<Action> = new Observable<Action>();
	const tasks: Task[] = [{ taskName: 'test_name_1' } as Task, { taskName: 'test_name_2' } as Task];

	eventInfoService = {
		fetchTasks: () => of(tasks)
	} as EventInfoService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				EventInfoEffects,
				provideMockActions(() => actions$),
				{
					provide: EventInfoService,
					useValue: eventInfoService,
				},
			],
		});

		effects = TestBed.inject(EventInfoEffects);
		eventInfoService = TestBed.inject(EventInfoService);
	}));

	it('should be creted', () => {
		expect(effects).toBeTruthy();
	});

	describe('EventInfoEffects', () => {
		it('should emit FetchTasksError action', () => {
			const error: Error = new Error();
			spyOn(eventInfoService, 'fetchTasks').and.throwError(error);
			effects.FetchTasks.subscribe((action: Action) => expect(action).toEqual(new FetchTasksError(error)));
		});

		it('should emit FetchTasksSuccess action', () => {
			spyOn(eventInfoService, 'fetchTasks').and.returnValue(of(tasks));
			effects.FetchTasks.subscribe((action: Action) => expect(action).toEqual(new FetchTasksSuccess(tasks)));
		});
	});
});
