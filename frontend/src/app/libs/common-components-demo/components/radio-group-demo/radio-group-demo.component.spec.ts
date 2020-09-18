import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupDemoComponent } from './radio-group-demo.component';

describe('RadioButtonDemoComponent', () => {
	let component: RadioGroupDemoComponent;
	let fixture: ComponentFixture<RadioGroupDemoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ RadioGroupDemoComponent ]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RadioGroupDemoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
