import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverCommonComponent } from './popover-common.component';

describe('PopoverCommonComponent', () => {
  let component: PopoverCommonComponent;
  let fixture: ComponentFixture<PopoverCommonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverCommonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopoverCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
