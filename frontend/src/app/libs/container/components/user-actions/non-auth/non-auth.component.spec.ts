import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthComponent } from './non-auth.component';

describe('NonAuthComponent', () => {
  let component: NonAuthComponent;
  let fixture: ComponentFixture<NonAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
