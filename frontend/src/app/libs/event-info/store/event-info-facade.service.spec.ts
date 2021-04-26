import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { EntityStatus } from '../../auth/models/entity-status';
import { Task } from '../../landing/models/task.model';

import { EventInfoFacadeService } from './event-info-facade.service';
import { FetchTasks, TaskSelected } from './event-info.actions';
import { EventInfoState } from './event-info.reducer';
import { getSelectedTask, getTasks } from './event-info.selectors';

describe('EventInfoFacadeService', () => {
	let service: EventInfoFacadeService;
	let store: MockStore;
	const taskMock: Task = {} as Task;
	const initialState: EventInfoState = {
		tasks: {
			status: EntityStatus.Init,
			error: null,
			value: [{ taskName: 'test_name_1' } as Task, { taskName: 'test_name_2' } as Task]
		},
		selectedTask: null
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				provideMockStore({ initialState })
			]
		});
		service = TestBed.inject(EventInfoFacadeService);
		store = TestBed.inject(MockStore);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('tasks$', () => {
		it('should return tasks from store', () => {
			const spy: jasmine.Spy = spyOn(store, 'select');
			const _: Observable<Task[]> = service.tasks$;
			expect(spy).toHaveBeenCalledWith(getTasks);
		});
	});

	describe('tasks$', () => {
		it('should return selected task from store', () => {
			const spy: jasmine.Spy = spyOn(store, 'select');
			const _: Observable<Task> = service.selectedTask$;
			expect(spy).toHaveBeenCalledWith(getSelectedTask);
		});
	});

	describe('fetchTasks', () => {
		it('should dispatch a FetchTasks action', () => {
			const spy: jasmine.Spy = spyOn(store, 'dispatch');
			service.fetchTasks();
			expect(spy).toHaveBeenCalledWith(new FetchTasks());
		});
	});

	describe('selectTask', () => {
		it('should dispatch a TaskSelected action', () => {
			const spy: jasmine.Spy = spyOn(store, 'dispatch');
			service.selectTask(taskMock);
			expect(spy).toHaveBeenCalledWith(new TaskSelected(taskMock));
		});
	});
});
