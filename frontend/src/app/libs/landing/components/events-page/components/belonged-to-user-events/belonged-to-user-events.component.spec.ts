import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BelongedToUserEventsComponent } from './belonged-to-user-events.component';

describe('BelongedToUserEventsComponent', () => {
  let component: BelongedToUserEventsComponent;
  let fixture: ComponentFixture<BelongedToUserEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BelongedToUserEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BelongedToUserEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
