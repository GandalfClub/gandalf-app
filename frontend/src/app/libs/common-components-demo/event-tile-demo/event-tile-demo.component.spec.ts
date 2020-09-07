import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventTileDemoComponent } from './event-tile-demo.component';

describe('EventTileDemoComponent', () => {
  let component: EventTileDemoComponent;
  let fixture: ComponentFixture<EventTileDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventTileDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventTileDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
