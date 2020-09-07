import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentsDemoGroupComponent } from './components-demo-group.component';

describe('ComponentsDemoGroupComponent', () => {
  let component: ComponentsDemoGroupComponent;
  let fixture: ComponentFixture<ComponentsDemoGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentsDemoGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentsDemoGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
