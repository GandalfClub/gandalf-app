import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreatorComponent } from './tasks-creator.component';

describe('TasksCreatorComponent', () => {
  let component: TasksCreatorComponent;
  let fixture: ComponentFixture<TasksCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksCreatorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
