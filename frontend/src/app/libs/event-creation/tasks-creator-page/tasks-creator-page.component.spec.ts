import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksCreatorPageComponent } from './tasks-creator-page.component';

describe('TasksCreatorPageComponent', () => {
  let component: TasksCreatorPageComponent;
  let fixture: ComponentFixture<TasksCreatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksCreatorPageComponent],
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
