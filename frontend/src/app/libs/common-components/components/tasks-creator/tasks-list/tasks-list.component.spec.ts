import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { TasksListComponent } from './tasks-list.component';
import { NewEventFacadeService } from '../../../../event-creation/store/event.facade';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { Task } from '../models/task';
import { TasksTypes } from '../models/tasks-creator';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

const translations: any = { 'TASK-CREATION.LIST_HEADER_TITLE' : 'This is a test' };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;
  let mockEventFacadeService: Partial<NewEventFacadeService>;
  let mockTranslateService: TranslateService;
  let injector: Injector;

  const key1: Symbol = Symbol('id');
  const key2: Symbol = Symbol('id');
  const key3: Symbol = Symbol('id');

  const mockTasks: Map<Symbol, Task> = new Map<Symbol, Task>([
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

  beforeEach(async(() => {
    mockEventFacadeService = {
      get tasks$(): Observable<Map<Symbol, Task>> {
        return of(mockTasks);
      }
    };

    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [TasksListComponent],
      providers: [
        {provide: NewEventFacadeService, useValue: mockEventFacadeService},
      ]
    }).compileComponents();

    injector = getTestBed();
    mockTranslateService = injector.get(TranslateService);
    mockTranslateService.use('en');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
