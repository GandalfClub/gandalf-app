import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';

import { TaskComponent } from './task.component';

describe('TaskComponent', () => {
	let component: TaskComponent;
	let fixture: ComponentFixture<TaskComponent>;
	let eventInfoFacadeService: EventInfoFacadeService;
	const taskMock: Task = {} as Task;

	eventInfoFacadeService = {
		selectedTask$: of(taskMock)
	} as EventInfoFacadeService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TaskComponent],
			providers: [
				{ provide: EventInfoFacadeService, useValue: eventInfoFacadeService }
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		eventInfoFacadeService = TestBed.inject(EventInfoFacadeService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
