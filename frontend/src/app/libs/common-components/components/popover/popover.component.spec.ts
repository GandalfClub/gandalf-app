import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { PopoverComponent } from './popover.component';

describe('PopoverCommonComponent', () => {
  let component: PopoverComponent;
  let fixture: ComponentFixture<PopoverComponent>;

  beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PopoverComponent],
			imports: [MatDialogModule],
			providers: [
				{
					provide: MatDialogRef,
					useValue: {},
				},
			],
		}).compileComponents();
  }));

  beforeEach(() => {
		fixture = TestBed.createComponent(PopoverComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
  });

  it('should create', () => {
		expect(component).toBeTruthy();
  });
});
