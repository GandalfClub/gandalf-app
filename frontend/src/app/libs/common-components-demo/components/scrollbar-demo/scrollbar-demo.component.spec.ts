import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollbarDemoComponent } from './scrollbar-demo.component';

describe('ScrollbarDemoComponent', () => {
  let component: ScrollbarDemoComponent;
  let fixture: ComponentFixture<ScrollbarDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollbarDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollbarDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
