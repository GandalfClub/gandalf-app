import { async, ComponentFixture, getTestBed, TestBed } from '@angular/core/testing';

import { TasksCreatorComponent } from './tasks-creator.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Injector } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { FormBuilder } from '@angular/forms';

const translations: any = { 'TASK-CREATION.LIST_HEADER_TITLE' : 'This is a test' };

class FakeLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(translations);
  }
}

describe('TasksCreatorComponent', () => {
  let component: TasksCreatorComponent;
  let fixture: ComponentFixture<TasksCreatorComponent>;
  let mockTranslateService: TranslateService;
  let injector: Injector;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {provide: TranslateLoader, useClass: FakeLoader},
        })
      ],
      declarations: [TasksCreatorComponent],
      providers: [FormBuilder],
    }).compileComponents();

    injector = getTestBed();
    mockTranslateService = injector.get(TranslateService);
    mockTranslateService.use('en');
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
