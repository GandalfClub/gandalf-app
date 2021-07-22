import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreatorPageComponent } from './tasks-creator-page.component';
import { NewEventFacadeService } from '../store/event.facade';

describe('TasksCreatorPageComponent', () => {
	let component: TasksCreatorPageComponent;
	let fixture: ComponentFixture<TasksCreatorPageComponent>;
	let mockEventFacadeService: Partial<NewEventFacadeService>;

	beforeEach(async(() => {
		mockEventFacadeService = {
			loadTasks(): void {
			}
		};

		TestBed.configureTestingModule({
			declarations: [TasksCreatorPageComponent],
			providers: [
				{provide: NewEventFacadeService, useValue: mockEventFacadeService},
			]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TasksCreatorPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
