import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

import { TasksViewerComponent } from './tasks-viewer.component';

describe('TasksViewerComponent', () => {
	let component: TasksViewerComponent;
	let fixture: ComponentFixture<TasksViewerComponent>;
	let eventInfoFacadeService: EventInfoFacadeService;
	const tasksMock: Task[] = [{} as Task, {} as Task];

	beforeEach(async(() => {
		eventInfoFacadeService = {
			tasks$: of(tasksMock),
			selectTask: (_: Task) => null,
			fetchTasks: () => null
		} as EventInfoFacadeService;

		TestBed.configureTestingModule({
			declarations: [TasksViewerComponent],
			providers: [
				{ provide: EventInfoFacadeService, useValue: eventInfoFacadeService }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TasksViewerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		eventInfoFacadeService = TestBed.inject(EventInfoFacadeService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('taskSelected', () => {
		it('should call selectTask', () => {
			const spy: jasmine.Spy  = spyOn(eventInfoFacadeService, 'selectTask');
			component.taskSelected(tasksMock[0]);
			expect(spy).toHaveBeenCalledWith(tasksMock[0]);
		});
	});
});
