import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverCommonDemoComponent } from './popover-common-demo.component';

describe('PopoverCommonDemoComponent', () => {
  let component: PopoverCommonDemoComponent;
  let fixture: ComponentFixture<PopoverCommonDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverCommonDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverCommonDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
