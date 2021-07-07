import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CommonComponentsModule } from '../../common-components/common-components.module';
import { Task } from '../../landing/models/task.model';
import { EventInfoFacadeService } from '../store/event-info-facade.service';
import { EventInfoStoreModule } from '../store/store.module';
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
			declarations: [
				TaskComponent
			],
			imports: [
				StoreModule.forRoot({}),
				EffectsModule.forRoot([]),
				CommonComponentsModule,
				TranslateModule.forRoot(),
				EventInfoStoreModule,
				FormsModule,
				ReactiveFormsModule,
			],
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
