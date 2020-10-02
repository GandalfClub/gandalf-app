import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventManagerComponent } from './event-manager.component';

describe('EventManagerComponent', () => {
  let component: EventManagerComponent;
  let fixture: ComponentFixture<EventManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
