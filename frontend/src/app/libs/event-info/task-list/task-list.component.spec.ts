import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../landing/models/task.model';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
	let component: TaskListComponent;
	let fixture: ComponentFixture<TaskListComponent>;
	let router: Router;

	const activatedRoute: ActivatedRoute = {} as ActivatedRoute;

	beforeEach(async(() => {
		router = jasmine.createSpyObj('Router', ['navigate']);

		TestBed.configureTestingModule({
			declarations: [TaskListComponent],
			providers: [
				{ provide: Router, useValue: router },
				{ provide: ActivatedRoute, useValue: activatedRoute },
			]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TaskListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		component.tasks = [{} as Task, {} as Task];
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	describe('taskOpened', () => {
		it('should call navigate method', () => {
			component.taskOpened(0);
			expect(router.navigate).toHaveBeenCalledWith([0], { relativeTo: activatedRoute });
		});

		it('should call selected emitter', () => {
			const spy: jasmine.Spy = spyOn(component.selected, 'emit');
			component.taskOpened(0);
			expect(spy).toHaveBeenCalledWith(component.tasks[0]);
		});

		it('should set selectedTask field', () => {
			component.taskOpened(0);
			expect(component.selectedTaskIndex).toBe(0);
		});
	});
});
